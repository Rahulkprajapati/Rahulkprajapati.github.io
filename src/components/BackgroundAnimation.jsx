import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const BackgroundAnimation = () => {
    const canvasRef = useRef(null);
    const { darkMode } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let mouse = { x: null, y: null, radius: 150 };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        resizeCanvas();

        const nodes = [];
        const packets = [];
        const nodeCount = 50; // Balanced density
        const packetCount = 15; // Number of active data packets

        class Node {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Slower, smoother movement for nodes
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
                this.size = Math.random() * 2 + 2;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 20) + 5;
            }

            update() {
                // Mouse interaction - gentle repulsion
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const maxDistance = mouse.radius;
                        const force = (maxDistance - distance) / maxDistance;
                        const directionX = (dx / distance) * force * this.density;
                        const directionY = (dy / distance) * force * this.density;

                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        // Return to base area gently
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 40;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 40;
                        }
                    }
                }

                this.x += this.vx;
                this.y += this.vy;

                // Seamless wraparound or bounce? Let's do bounce for stability
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
                // Subtle glow for nodes
                ctx.shadowBlur = 5;
                ctx.shadowColor = darkMode ? 'rgba(34, 211, 238, 0.3)' : 'rgba(6, 182, 212, 0.3)';
                ctx.fillStyle = darkMode ? 'rgba(34, 211, 238, 0.5)' : 'rgba(6, 182, 212, 0.5)';
                ctx.fill();
                ctx.shadowBlur = 0; // Reset
            }
        }

        class Packet {
            constructor() {
                this.trail = [];
                this.trailLength = 10;
                this.reset();
            }

            reset() {
                if (nodes.length > 0) {
                    this.targetIndex = Math.floor(Math.random() * nodes.length);
                    this.currentX = nodes[this.targetIndex].x;
                    this.currentY = nodes[this.targetIndex].y;
                    this.progress = 0;
                    this.speed = 0.03 + Math.random() * 0.04; // Random speeds
                    this.sourceIndex = this.targetIndex;
                    this.findNewTarget();
                    this.trail = []; // Clear trail on reset
                }
            }

            findNewTarget() {
                let neighbors = [];
                // Look for connected nodes (distance check)
                for (let i = 0; i < nodes.length; i++) {
                    if (i === this.sourceIndex) continue;
                    let dx = nodes[i].x - nodes[this.sourceIndex].x;
                    let dy = nodes[i].y - nodes[this.sourceIndex].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200) { // Connection range
                        neighbors.push(i);
                    }
                }

                if (neighbors.length > 0) {
                    this.targetIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
                } else {
                    // Start over at a random node if stuck
                    this.targetIndex = Math.floor(Math.random() * nodes.length);
                    this.currentX = nodes[this.targetIndex].x;
                    this.currentY = nodes[this.targetIndex].y;
                    this.sourceIndex = this.targetIndex;
                    this.trail = [];
                }
            }

            update() {
                if (nodes.length === 0) return;

                const source = nodes[this.sourceIndex];
                const target = nodes[this.targetIndex];

                if (!source || !target) {
                    this.reset();
                    return;
                }

                if (this.sourceIndex === this.targetIndex) {
                    this.findNewTarget();
                    return;
                }

                // Add current position to trail
                this.trail.push({ x: this.currentX, y: this.currentY });
                if (this.trail.length > this.trailLength) {
                    this.trail.shift();
                }

                this.progress += this.speed;
                if (this.progress >= 1) {
                    // Arrived at target
                    this.sourceIndex = this.targetIndex;
                    this.progress = 0;
                    this.currentX = nodes[this.sourceIndex].x;
                    this.currentY = nodes[this.sourceIndex].y;
                    this.findNewTarget();
                } else {
                    // Move
                    this.currentX = source.x + (target.x - source.x) * this.progress;
                    this.currentY = source.y + (target.y - source.y) * this.progress;
                }
            }

            draw() {
                // Draw Trail
                if (this.trail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(this.trail[0].x, this.trail[0].y);
                    for (let i = 1; i < this.trail.length; i++) {
                        ctx.lineTo(this.trail[i].x, this.trail[i].y);
                    }
                    // Tapering opacity for trail
                    const gradient = ctx.createLinearGradient(
                        this.trail[0].x, this.trail[0].y,
                        this.currentX, this.currentY
                    );
                    gradient.addColorStop(0, 'rgba(34, 211, 238, 0)');
                    gradient.addColorStop(1, darkMode ? 'rgba(34, 211, 238, 0.8)' : 'rgba(37, 99, 235, 0.8)');

                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }

                // Draw Head (Packet)
                ctx.beginPath();
                ctx.arc(this.currentX, this.currentY, 3, 0, Math.PI * 2);

                // Glow Effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = darkMode ? '#22d3ee' : '#2563eb'; // Cyan or Royal Blue glow
                ctx.fillStyle = '#ffffff'; // White center core
                ctx.fill();

                // Reset shadow for text/lines
                ctx.shadowBlur = 0;
            }
        }

        // Initialize
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new Node());
        }
        for (let i = 0; i < packetCount; i++) {
            packets.push(new Packet());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections between nodes
            nodes.forEach((node, index) => {
                node.update();
                node.draw();

                for (let j = index + 1; j < nodes.length; j++) {
                    const dx = node.x - nodes[j].x;
                    const dy = node.y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 200) {
                        ctx.beginPath();
                        // Darker/subtler lines so packets pop
                        ctx.strokeStyle = darkMode ? `rgba(34, 211, 238, ${0.1 - distance / 2000})` : `rgba(100, 116, 139, ${0.15 - distance / 1500})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            });

            // Draw Packets on top
            packets.forEach(packet => {
                packet.update();
                packet.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [darkMode]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none transition-colors duration-500"
            style={{
                background: darkMode
                    ? 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)'
                    : 'radial-gradient(circle at 50% 50%, #f8fafc 0%, #e2e8f0 100%)'
            }}
        />
    );
};

export default BackgroundAnimation;
