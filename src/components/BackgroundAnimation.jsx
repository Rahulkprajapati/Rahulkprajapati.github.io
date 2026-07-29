import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const getPalette = (darkMode) => ({
    bgTop: darkMode ? '#020617' : '#ffffff',
    bgMid: darkMode ? '#07111f' : '#f8fafc',
    bgBottom: darkMode ? '#0f172a' : '#eef6ff',
    grid: darkMode ? 'rgba(148, 163, 184, 0.07)' : 'rgba(15, 23, 42, 0.05)',
    gridAccent: darkMode ? 'rgba(34, 211, 238, 0.14)' : 'rgba(14, 165, 233, 0.12)',
    trace: darkMode ? 'rgba(103, 232, 249, 0.18)' : 'rgba(8, 145, 178, 0.14)',
    traceHot: darkMode ? 'rgba(248, 113, 113, 0.18)' : 'rgba(220, 38, 38, 0.12)',
    text: darkMode ? 'rgba(226, 232, 240, 0.30)' : 'rgba(15, 23, 42, 0.28)',
    panel: darkMode ? 'rgba(15, 23, 42, 0.36)' : 'rgba(255, 255, 255, 0.58)',
    panelBorder: darkMode ? 'rgba(148, 163, 184, 0.14)' : 'rgba(15, 23, 42, 0.10)',
    packet: darkMode ? '#67e8f9' : '#0891b2',
    packetHot: darkMode ? '#fb7185' : '#dc2626',
});

const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
};

const lerpPoint = (points, progress) => {
    const segments = points.length - 1;
    const raw = Math.min(progress, 0.999) * segments;
    const index = Math.floor(raw);
    const local = raw - index;
    const from = points[index];
    const to = points[index + 1];

    return {
        x: from.x + (to.x - from.x) * local,
        y: from.y + (to.y - from.y) * local,
    };
};

const BackgroundAnimation = () => {
    const canvasRef = useRef(null);
    const { darkMode } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const mouse = { x: 0, y: 0, active: false };
        let animationFrameId;
        let width = 0;
        let height = 0;
        let dpr = 1;
        let traces = [];

        const resizeCanvas = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const right = width * 0.86;
            const left = width * 0.58;
            const low = height * 0.78;
            const high = height * 0.28;
            traces = [
                {
                    label: 'plan',
                    hot: false,
                    delay: 0.05,
                    points: [
                        { x: left, y: high },
                        { x: right, y: high },
                        { x: right, y: high + 118 },
                    ],
                },
                {
                    label: 'verify',
                    hot: true,
                    delay: 0.28,
                    points: [
                        { x: width * 0.70, y: low },
                        { x: width * 0.92, y: low },
                        { x: width * 0.92, y: low - 122 },
                    ],
                },
                {
                    label: 'agent',
                    hot: false,
                    delay: 0.52,
                    points: [
                        { x: width * 0.10, y: height * 0.76 },
                        { x: width * 0.34, y: height * 0.76 },
                        { x: width * 0.34, y: height * 0.58 },
                    ],
                },
            ];
        };

        const handleMouseMove = (event) => {
            mouse.x = event.clientX / Math.max(width, 1) - 0.5;
            mouse.y = event.clientY / Math.max(height, 1) - 0.5;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        const drawBackdrop = (palette) => {
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, palette.bgTop);
            gradient.addColorStop(0.58, palette.bgMid);
            gradient.addColorStop(1, palette.bgBottom);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        };

        const drawBlueprintGrid = (palette, time, shiftX, shiftY) => {
            const spacing = width < 760 ? 54 : 68;
            const top = height * 0.08;
            const horizon = height * 0.58;
            const floor = height + spacing;
            const drift = (time * 0.004) % spacing;

            ctx.lineWidth = 1;
            for (let x = -spacing * 2; x < width + spacing * 2; x += spacing) {
                const isAccent = Math.round((x + drift) / spacing) % 4 === 0;
                ctx.strokeStyle = isAccent ? palette.gridAccent : palette.grid;
                ctx.beginPath();
                ctx.moveTo(x + drift + shiftX * 0.15, top);
                ctx.lineTo(x * 1.18 - width * 0.09 + shiftX * 0.45, floor);
                ctx.stroke();
            }

            for (let y = horizon; y < floor; y += spacing * 0.72) {
                const depth = (y - horizon) / Math.max(floor - horizon, 1);
                ctx.strokeStyle = depth > 0.74 ? palette.gridAccent : palette.grid;
                ctx.beginPath();
                ctx.moveTo(0, y + shiftY * 0.25);
                ctx.lineTo(width, y + shiftY * 0.25);
                ctx.stroke();
            }
        };

        const drawPanel = (ctx, palette, x, y, width, title, rows, phase) => {
            drawRoundedRect(ctx, x, y, width, 88, 10);
            ctx.fillStyle = palette.panel;
            ctx.fill();
            ctx.strokeStyle = palette.panelBorder;
            ctx.stroke();

            ctx.font = '800 11px Inter, system-ui, sans-serif';
            ctx.fillStyle = palette.text;
            ctx.fillText(title, x + 14, y + 22);

            rows.forEach((row, index) => {
                const pulse = 0.35 + Math.sin(phase + index * 1.7) * 0.16;
                ctx.fillStyle = index === 1 ? `rgba(103, 232, 249, ${pulse})` : palette.panelBorder;
                drawRoundedRect(ctx, x + 14, y + 38 + index * 15, row, 4, 2);
                ctx.fill();
            });
        };

        const drawPanels = (palette, time, shiftX, shiftY) => {
            drawPanel(ctx, palette, width * 0.68 + shiftX * 0.2, height * 0.18 + shiftY * 0.1, 178, 'AI RUNBOOK', [96, 126, 72], time * 0.002);
            drawPanel(ctx, palette, width * 0.08 - shiftX * 0.15, height * 0.66 - shiftY * 0.1, 164, 'SRE CHECK', [84, 118, 62], time * 0.0025);
            drawPanel(ctx, palette, width * 0.76 - shiftX * 0.18, height * 0.68 + shiftY * 0.12, 154, 'DMS SYNC', [72, 110, 92], time * 0.0018);
        };

        const drawTrace = (palette, trace, time, shiftX, shiftY) => {
            const points = trace.points.map((point) => ({
                x: point.x + shiftX * 0.22,
                y: point.y + shiftY * 0.18,
            }));

            ctx.strokeStyle = trace.hot ? palette.traceHot : palette.trace;
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
            ctx.stroke();

            points.forEach((point, index) => {
                const alpha = 0.22 + Math.sin(time * 0.002 + index) * 0.08;
                ctx.fillStyle = trace.hot ? `rgba(248, 113, 113, ${alpha})` : `rgba(103, 232, 249, ${alpha})`;
                drawRoundedRect(ctx, point.x - 4, point.y - 4, 8, 8, 2);
                ctx.fill();
            });

            const speed = reducedMotion ? 0.00005 : 0.00011;
            const progress = (trace.delay + time * speed) % 1;
            const packet = lerpPoint(points, progress);
            ctx.shadowBlur = 18;
            ctx.shadowColor = trace.hot ? palette.packetHot : palette.packet;
            ctx.fillStyle = trace.hot ? palette.packetHot : palette.packet;
            ctx.beginPath();
            ctx.arc(packet.x, packet.y, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        };

        const drawScanBand = (palette, time) => {
            const y = ((time * 0.018) % (height + 220)) - 120;
            const gradient = ctx.createLinearGradient(0, y, width, y + 140);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
            gradient.addColorStop(0.48, darkMode ? 'rgba(34, 211, 238, 0.045)' : 'rgba(14, 165, 233, 0.035)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, y, width, 140);
        };

        const animate = (time) => {
            const palette = getPalette(darkMode);
            const shiftX = mouse.active ? mouse.x * 34 : Math.sin(time * 0.0002) * 10;
            const shiftY = mouse.active ? mouse.y * 28 : Math.cos(time * 0.00018) * 8;

            drawBackdrop(palette);
            drawBlueprintGrid(palette, time, shiftX, shiftY);
            drawScanBand(palette, time);
            drawPanels(palette, time, shiftX, shiftY);
            traces.forEach((trace) => drawTrace(palette, trace, time, shiftX, shiftY));

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        resizeCanvas();
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [darkMode]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed top-0 left-0 z-0 w-full h-full pointer-events-none transition-colors duration-500"
        />
    );
};

export default BackgroundAnimation;
