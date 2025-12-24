import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const BackgroundAnimation = () => {
    const canvasRef = useRef(null);
    const { darkMode } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const particles = [];
        const particleCount = 70; // Adjust for density

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = darkMode ? 'rgba(34, 211, 238, 0.2)' : 'rgba(6, 182, 212, 0.2)'; // Cyan-400 / Cyan-500 optimized
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();

                for (let j = index + 1; j < particles.length; j++) {
                    const dx = particle.x - particles[j].x;
                    const dy = particle.y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = darkMode ? `rgba(34, 211, 238, ${0.1 - distance / 2000})` : `rgba(6, 182, 212, ${0.15 - distance / 1500})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [darkMode]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none transition-colors duration-500"
            style={{
                background: darkMode ? 'radial-gradient(circle at 50% 50%, #1a202c 0%, #111827 100%)' : 'radial-gradient(circle at 50% 50%, #f9fafb 0%, #f3f4f6 100%)'
            }}
        />
    );
};

export default BackgroundAnimation;
