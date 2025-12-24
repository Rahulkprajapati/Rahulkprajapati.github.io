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
        const nodeCount = 60; // "Server" nodes
        const packetCount = 20; // Data packets

        class Node {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3; // Slower movement for servers
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 3 + 2; // Larger for server look
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
            }

            update() {
                // Mouse interaction
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const maxDistance = mouse.radius;
                        const force = (maxDistance - distance) / maxDistance;
                        const directionX = forceDirectionX * force * this.density;
                        const directionY = forceDirectionY * force * this.density;

                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 20;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 20;
                        }
                    }
                }

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                // Draw square for "server" look
                ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
                ctx.fillStyle = darkMode ? 'rgba(34, 211, 238, 0.4)' : 'rgba(6, 182, 212, 0.4)';
                ctx.fill();
            }
        }

        class Packet {
            constructor() {
                this.positions = [];
                this.reset();
            }

            reset() {
                // Pick random start node
                if (nodes.length > 0) {
                    this.targetIndex = Math.floor(Math.random() * nodes.length);
                    this.currentX = nodes[this.targetIndex].x;
                    this.currentY = nodes[this.targetIndex].y;
                    this.progress = 0;
                    this.speed = 0.05 + Math.random() * 0.05;
                    this.sourceIndex = this.targetIndex;
                    this.findNewTarget();
                }
            }

            findNewTarget() {
                // Find a neighbor within range
                let neighbors = [];
                for (let i = 0; i < nodes.length; i++) {
                    if (i === this.sourceIndex) continue;
                    let dx = nodes[i].x - nodes[this.sourceIndex].x;
                    let dy = nodes[i].y - nodes[this.sourceIndex].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        neighbors.push(i);
                    }
                }

                if (neighbors.length > 0) {
                    this.targetIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
                } else {
                    // "Teleport" / New request
                    this.targetIndex = Math.floor(Math.random() * nodes.length);
                    this.currentX = nodes[this.targetIndex].x;
                    this.currentY = nodes[this.targetIndex].y;
                    this.sourceIndex = this.targetIndex;
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

                // If teleporting (neighbors check failed inside reset/findNewTarget loop logic simulation)
                // Actually simple logic: interpolate
                if (this.sourceIndex === this.targetIndex) {
                    this.findNewTarget();
                    return;
                }

                this.progress += this.speed;
                if (this.progress >= 1) {
                    this.sourceIndex = this.targetIndex;
                    this.progress = 0;
                    this.currentX = nodes[this.sourceIndex].x;
                    this.currentY = nodes[this.sourceIndex].y;
                    this.findNewTarget();
                } else {
                    this.currentX = source.x + (target.x - source.x) * this.progress;
                    this.currentY = source.y + (target.y - source.y) * this.progress;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.currentX, this.currentY, 2, 0, Math.PI * 2);
                ctx.fillStyle = darkMode ? '#ffffff' : '#000000'; // High contrast data packet
                ctx.fill();
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

            // Draw connections
            nodes.forEach((node, index) => {
                node.update();
                node.draw();

                for (let j = index + 1; j < nodes.length; j++) {
                    const dx = node.x - nodes[j].x;
                    const dy = node.y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = darkMode ? `rgba(34, 211, 238, ${0.15 - distance / 1500})` : `rgba(6, 182, 212, ${0.15 - distance / 1500})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            });

            // Draw Packets
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
                background: darkMode ? 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)' : 'radial-gradient(circle at 50% 50%, #f8fafc 0%, #e2e8f0 100%)'
            }}
        />
    );
};

export default BackgroundAnimation;
