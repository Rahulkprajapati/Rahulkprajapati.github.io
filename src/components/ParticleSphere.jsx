import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// Canvas-only on purpose: a WebGL library would roughly double the bundle for
// one visual, and page weight matters for search ranking on mobile.

const hexToRgb = (value, fallback) => {
    const hex = value.trim().replace('#', '');
    if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback;
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
};

// Evenly spaced points on a unit sphere (golden-angle spiral)
const fibonacciSphere = (count) => {
    const points = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = golden * i;
        points.push([Math.cos(theta) * radius, y, Math.sin(theta) * radius]);
    }
    return points;
};

// Great circle tilted by `tilt` around X then `yaw` around Y
const orbitPoint = (t, tilt, yaw) => {
    const x = Math.cos(t);
    const z = Math.sin(t);
    const y1 = -z * Math.sin(tilt);
    const z1 = z * Math.cos(tilt);
    return [x * Math.cos(yaw) - z1 * Math.sin(yaw), y1, x * Math.sin(yaw) + z1 * Math.cos(yaw)];
};

const ORBITS = [
    { tilt: 1.1, yaw: 0.4, speed: 0.00042 },
    { tilt: -0.6, yaw: -0.9, speed: -0.00031 },
];

// desktopFocusX: horizontal centre (0–1) from lg up, where the ID card covers
// the panel's left edge; below lg the sphere is centred behind the card.
const ParticleSphere = ({ className = '', count = 760, desktopFocusX = 0.5 }) => {
    const canvasRef = useRef(null);
    const { darkMode } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const desktop = window.matchMedia('(min-width: 1024px)');

        const points = fibonacciSphere(window.innerWidth < 640 ? Math.round(count * 0.55) : count);
        const hubs = new Set([23, 131, 247, 362, 488, 601].map((i) => i % points.length));

        let colors = null;
        let width = 0;
        let height = 0;
        let frame = 0;
        let running = false;
        let visible = true;

        let rotY = 0.8;
        let rotX = -0.32;
        let velocity = 0.0019;
        const baseVelocity = 0.0019;
        let dragging = false;
        let lastX = 0;
        let lastY = 0;

        // Theme tokens are applied by a parent effect that runs after this
        // one, so colours are read lazily on the first painted frame.
        const readColors = () => {
            const css = getComputedStyle(document.documentElement);
            colors = {
                accent: hexToRgb(css.getPropertyValue('--accent'), [124, 245, 198]),
                tech: hexToRgb(css.getPropertyValue('--tech'), [180, 164, 255]),
                ink: hexToRgb(css.getPropertyValue('--text'), [232, 239, 235]),
            };
        };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = (time) => {
            if (!colors) readColors();
            const { accent, tech, ink } = colors;
            ctx.clearRect(0, 0, width, height);

            const side = desktop.matches && desktopFocusX !== 0.5;
            const cx = width * (side ? desktopFocusX : 0.5);
            const cy = height / 2;
            // Beside the card, fit the sphere to the uncovered area; centred
            // behind it, make it a little wider so the limb shows on both sides
            const R = side
                ? Math.min(height * 0.36, width * (1 - desktopFocusX) * 0.62)
                : Math.min(Math.min(width, height) * 0.46, width * 0.36);

            const cosY = Math.cos(rotY);
            const sinY = Math.sin(rotY);
            const cosX = Math.cos(rotX);
            const sinX = Math.sin(rotX);

            const project = ([x, y, z]) => {
                const x1 = x * cosY - z * sinY;
                const z1 = x * sinY + z * cosY;
                const y1 = y * cosX - z1 * sinX;
                const z2 = y * sinX + z1 * cosX;
                const scale = 4 / (4 - z2);
                return { x: cx + x1 * R * scale, y: cy + y1 * R * scale, z: z2, scale };
            };

            // Silhouette and equator
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(${ink.join(',')},0.07)`;
            ctx.beginPath();
            ctx.arc(cx, cy, R * 1.02, 0, Math.PI * 2);
            ctx.stroke();

            // Orbits, brighter on the near side, each carrying a satellite
            ORBITS.forEach((orbit, index) => {
                const steps = 96;
                let prev = null;
                for (let s = 0; s <= steps; s++) {
                    const p = project(orbitPoint((s / steps) * Math.PI * 2, orbit.tilt, orbit.yaw).map((v) => v * 1.28));
                    if (prev) {
                        const alpha = 0.05 + 0.2 * ((p.z + 1) / 2);
                        ctx.strokeStyle = `rgba(${(index ? tech : accent).join(',')},${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(prev.x, prev.y);
                        ctx.lineTo(p.x, p.y);
                        ctx.stroke();
                    }
                    prev = p;
                }
                const sat = project(orbitPoint(time * orbit.speed, orbit.tilt, orbit.yaw).map((v) => v * 1.28));
                const c = (index ? tech : accent).join(',');
                ctx.fillStyle = `rgba(${c},${0.35 + 0.65 * ((sat.z + 1) / 2)})`;
                ctx.shadowColor = `rgba(${c},0.9)`;
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.arc(sat.x, sat.y, 2.4 * sat.scale, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            // Point cloud: depth drives both alpha and size
            for (let i = 0; i < points.length; i++) {
                if (hubs.has(i)) continue;
                const p = project(points[i]);
                const depth = (p.z + 1) / 2;
                const alpha = 0.08 + 0.8 * depth * depth;
                const size = (0.7 + 1.1 * depth) * p.scale;
                const c = depth > 0.55 ? accent : ink;
                ctx.fillStyle = `rgba(${c.join(',')},${depth > 0.55 ? alpha : alpha * 0.55})`;
                ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
            }

            // Hubs: region markers that pulse while facing the viewer
            hubs.forEach((i) => {
                const p = project(points[i]);
                if (p.z < -0.1) return;
                const pulse = ((time / 1600 + i * 0.13) % 1);
                ctx.strokeStyle = `rgba(${tech.join(',')},${0.55 * (1 - pulse)})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3 + pulse * 11, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = `rgba(${tech.join(',')},0.95)`;
                ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
            });
        };

        const loop = (time) => {
            if (!dragging) {
                velocity += (baseVelocity - velocity) * 0.02;
                rotY += velocity;
            }
            draw(time);
            frame = requestAnimationFrame(loop);
        };

        const start = () => {
            if (running || reducedMotion || !visible || document.hidden) return;
            running = true;
            frame = requestAnimationFrame(loop);
        };
        const stop = () => {
            running = false;
            cancelAnimationFrame(frame);
        };

        const onPointerDown = (e) => {
            dragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            canvas.setPointerCapture(e.pointerId);
        };
        const onPointerMove = (e) => {
            if (!dragging) return;
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;
            rotY += dx * 0.006;
            rotX = Math.max(-1.1, Math.min(1.1, rotX + dy * 0.004));
            velocity = dx * 0.0009;
            if (!running) draw(performance.now());
        };
        const onPointerUp = () => {
            dragging = false;
        };

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
            else stop();
        });
        const onVisibility = () => (document.hidden ? stop() : start());
        const onResize = () => {
            resize();
            if (!running) draw(performance.now());
        };

        resize();
        observer.observe(canvas);
        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', onVisibility);
        canvas.addEventListener('pointerdown', onPointerDown);
        canvas.addEventListener('pointermove', onPointerMove);
        canvas.addEventListener('pointerup', onPointerUp);
        canvas.addEventListener('pointercancel', onPointerUp);

        // Paint a static first frame even in a background tab: rAF is paused
        // while hidden (ctrl-clicked links, link-preview screenshotters), but
        // timers still run. The timeout also lets the theme class land first.
        const firstFrame = setTimeout(() => draw(performance.now()), 0);
        start();

        return () => {
            clearTimeout(firstFrame);
            stop();
            observer.disconnect();
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', onVisibility);
            canvas.removeEventListener('pointerdown', onPointerDown);
            canvas.removeEventListener('pointermove', onPointerMove);
            canvas.removeEventListener('pointerup', onPointerUp);
            canvas.removeEventListener('pointercancel', onPointerUp);
        };
    }, [darkMode, count, desktopFocusX]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`cursor-grab active:cursor-grabbing ${className}`}
            style={{ touchAction: 'pan-y' }}
        />
    );
};

export default ParticleSphere;
