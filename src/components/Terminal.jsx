import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const Terminal = ({ onClose }) => {
    const terminalRef = useRef(null);
    const xtermRef = useRef(null);

    useEffect(() => {
        // Initialize terminal
        const term = new XTerm({
            cursorBlink: true,
            theme: {
                background: '#1a1b26',
                foreground: '#00D9FF',
                cursor: '#00D9FF',
                black: '#15161E',
                red: '#f7768e',
                green: '#9ece6a',
                yellow: '#e0af68',
                blue: '#7aa2f7',
                magenta: '#bb9af7',
                cyan: '#7dcfff',
                white: '#a9b1d6',
                brightBlack: '#414868',
                brightRed: '#f7768e',
                brightGreen: '#9ece6a',
                brightYellow: '#e0af68',
                brightBlue: '#7aa2f7',
                brightMagenta: '#bb9af7',
                brightCyan: '#7dcfff',
                brightWhite: '#c0caf5',
            },
            fontSize: 14,
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        term.open(terminalRef.current);
        fitAddon.fit();

        xtermRef.current = term;

        // Welcome message
        term.writeln('\x1b[1;36m╔═══════════════════════════════════════════════════════════╗\x1b[0m');
        term.writeln('\x1b[1;36m║\x1b[0m  \x1b[1;37mWelcome to Rahul\'s Interactive Terminal\x1b[0m                  \x1b[1;36m║\x1b[0m');
        term.writeln('\x1b[1;36m╚═══════════════════════════════════════════════════════════╝\x1b[0m');
        term.writeln('');
        term.writeln('Type \x1b[1;33mhelp\x1b[0m to see available commands.');
        term.writeln('');

        let currentLine = '';
        const prompt = () => term.write('\r\n\x1b[1;32mrahul@portfolio\x1b[0m:\x1b[1;34m~\x1b[0m$ ');
        prompt();

        const commands = {
            help: () => {
                term.writeln('\r\n\x1b[1;36mAvailable Commands:\x1b[0m');
                term.writeln('  \x1b[1;33mhelp\x1b[0m       - Show this help message');
                term.writeln('  \x1b[1;33mabout\x1b[0m      - Learn about me');
                term.writeln('  \x1b[1;33mskills\x1b[0m     - View my technical skills');
                term.writeln('  \x1b[1;33mexperience\x1b[0m - Show work experience');
                term.writeln('  \x1b[1;33mcontact\x1b[0m    - Get contact information');
                term.writeln('  \x1b[1;33mclear\x1b[0m      - Clear terminal');
                term.writeln('  \x1b[1;33mexit\x1b[0m       - Close terminal');
            },
            about: () => {
                term.writeln('\r\n\x1b[1;36m👨‍💻 About Me\x1b[0m');
                term.writeln('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                term.writeln('DevOps Engineer passionate about cloud infrastructure,');
                term.writeln('automation, and building scalable systems. I specialize in');
                term.writeln('AWS, GCP, Azure, Kubernetes, and CI/CD pipelines.');
            },
            skills: () => {
                term.writeln('\r\n\x1b[1;36m🛠️  Technical Skills\x1b[0m');
                term.writeln('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                term.writeln('☁️  Cloud: AWS, GCP, Azure');
                term.writeln('📦 Containers: Kubernetes, Docker');
                term.writeln('🏗️  IaC: Terraform, Ansible');
                term.writeln('🔄 CI/CD: Jenkins, GitLab, ArgoCD, CircleCI, Helm');
                term.writeln('📊 Monitoring: Prometheus, Grafana, Datadog');
                term.writeln('💻 Languages: Python, Go, Bash');
            },
            experience: () => {
                term.writeln('\r\n\x1b[1;36m💼 Work Experience\x1b[0m');
                term.writeln('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                term.writeln('\x1b[1;33mAlteryx\x1b[0m - DevOps Engineer (2023 - Present)');
                term.writeln('  • Cloud infrastructure management');
                term.writeln('  • CI/CD pipeline optimization');
                term.writeln('');
                term.writeln('\x1b[1;33mZeotap\x1b[0m - DevOps Engineer (2022 - 2023)');
                term.writeln('  • Kubernetes cluster management');
                term.writeln('  • Infrastructure automation');
            },
            contact: () => {
                term.writeln('\r\n\x1b[1;36m📧 Contact Information\x1b[0m');
                term.writeln('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                term.writeln('📧 Email: rahulkpkprajapati147@gmail.com');
                term.writeln('💼 LinkedIn: linkedin.com/in/rahulkumarprajapati');
                term.writeln('🐙 GitHub: github.com/Rahulkprajapati');
                term.writeln('📝 Medium: medium.com/@rahulkprajapati');
            },
            clear: () => {
                term.clear();
            },
            exit: () => {
                term.writeln('\r\n\x1b[1;32mGoodbye! 👋\x1b[0m');
                setTimeout(onClose, 500);
            },
        };

        const handleCommand = (cmd) => {
            const trimmedCmd = cmd.trim().toLowerCase();
            if (commands[trimmedCmd]) {
                commands[trimmedCmd]();
            } else if (trimmedCmd) {
                term.writeln(`\r\n\x1b[1;31mCommand not found: ${trimmedCmd}\x1b[0m`);
                term.writeln('Type \x1b[1;33mhelp\x1b[0m to see available commands.');
            }
            currentLine = '';
            prompt();
        };

        term.onData((data) => {
            const code = data.charCodeAt(0);

            if (code === 13) { // Enter
                handleCommand(currentLine);
            } else if (code === 127) { // Backspace
                if (currentLine.length > 0) {
                    currentLine = currentLine.slice(0, -1);
                    term.write('\b \b');
                }
            } else if (code >= 32 && code < 127) { // Printable characters
                currentLine += data;
                term.write(data);
            }
        });

        // Handle window resize
        const handleResize = () => fitAddon.fit();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            term.dispose();
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gray-900 rounded-lg w-full max-w-4xl h-[600px] relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="bg-gray-800 rounded-t-lg px-4 py-2 flex items-center justify-between">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-400 text-sm">rahul@portfolio:~</span>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>
                <div ref={terminalRef} className="h-[calc(100%-40px)] p-2" />
            </div>
        </div>
    );
};

export default Terminal;
