import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { experiences, profile } from '../data/profile';

const Terminal = ({ onClose }) => {
    const terminalRef = useRef(null);
    const xtermRef = useRef(null);

    useEffect(() => {
        // Initialize terminal
        const term = new XTerm({
            cursorBlink: true,
            convertEol: true,
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
        term.writeln('\x1b[1;36m╔════════════════════════════════════════════════════════════════╗\x1b[0m');
        term.writeln('\x1b[1;36m║\x1b[0m  \x1b[1;37mRahulOS: platform, SRE, AI agents, and cloud automation\x1b[0m  \x1b[1;36m║\x1b[0m');
        term.writeln('\x1b[1;36m╚════════════════════════════════════════════════════════════════╝\x1b[0m');
        term.writeln('');
        term.writeln('Type \x1b[1;33mhelp\x1b[0m. Try \x1b[1;33mmove\x1b[0m, \x1b[1;33mai\x1b[0m, \x1b[1;33mtoolkit\x1b[0m, or \x1b[1;33mresume\x1b[0m.');
        term.writeln('');

        let currentLine = '';
        let commandHistory = [];
        let historyIndex = -1;
        const promptText = '\x1b[1;32mrahul@move\x1b[0m:\x1b[1;34m~/platform\x1b[0m$ ';
        const prompt = () => term.write('\r\n' + promptText);
        prompt();

        const rewriteLine = (value) => {
            term.write('\r\x1b[2K' + promptText + value);
            currentLine = value;
        };

        const writeSection = (title) => {
            term.writeln(`\r\n\x1b[1;36m${title}\x1b[0m`);
            term.writeln('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        };

        const writeList = (items) => {
            items.forEach((item) => term.writeln(`  \x1b[36m▸\x1b[0m ${item}`));
        };

        const openUrl = (url) => {
            window.open(url, '_blank', 'noopener,noreferrer');
            term.writeln(`\r\nOpening ${url}`);
        };

        const currentExperience = experiences.find((exp) => exp.status === 'Current');

        const commands = {
            help: () => {
                writeSection('Command Map');
                term.writeln('  \x1b[1;33mabout\x1b[0m       - Who I am and what I build');
                term.writeln('  \x1b[1;33mmove\x1b[0m        - Current AirAsia MOVE platform work');
                term.writeln('  \x1b[1;33mai\x1b[0m          - AI agents and automation focus');
                term.writeln('  \x1b[1;33mtoolkit\x1b[0m     - Daily platform stack');
                term.writeln('  \x1b[1;33mexperience\x1b[0m  - Career timeline');
                term.writeln('  \x1b[1;33mresume\x1b[0m      - Open resume PDF');
                term.writeln('  \x1b[1;33mlinks\x1b[0m       - GitHub, LinkedIn, Medium');
                term.writeln('  \x1b[1;33mcontact\x1b[0m     - Email and phone');
                term.writeln('  \x1b[1;33mclear\x1b[0m       - Clear terminal');
                term.writeln('  \x1b[1;33mexit\x1b[0m        - Close terminal');
                term.writeln('');
                term.writeln('  Shortcuts: \x1b[1;33mwhoami\x1b[0m, \x1b[1;33mskills\x1b[0m, \x1b[1;33mcv\x1b[0m, \x1b[1;33mgh\x1b[0m, \x1b[1;33mli\x1b[0m, \x1b[1;33mmedium\x1b[0m');
                term.writeln('  Keyboard: up/down for history, tab for autocomplete');
            },
            about: () => {
                writeSection('About Rahul');
                term.writeln(profile.summary);
                term.writeln(profile.current);
                term.writeln('');
                writeList([
                    'Cloud systems that stay calm under pressure.',
                    'Production-minded platform engineering across data, compute, delivery, and reliability.',
                    'AI agents and automations for inventory, evidence, validation loops, and runbooks.',
                ]);
            },
            skills: () => {
                commands.toolkit();
            },
            toolkit: () => {
                writeSection('Daily Platform Toolkit');
                term.writeln('\x1b[1;33mCloud\x1b[0m       GCP, AWS, Azure, IAM, VPC, Cloud SQL');
                term.writeln('\x1b[1;33mRuntime\x1b[0m     Kubernetes, GKE, Docker, Helm, ArgoCD');
                term.writeln('\x1b[1;33mIaC\x1b[0m         Terraform, Ansible, GitOps');
                term.writeln('\x1b[1;33mDelivery\x1b[0m    GitLab CI, Jenkins, CircleCI, GitHub Actions, Harness');
                term.writeln('\x1b[1;33mData\x1b[0m        Cloud SQL, DMS, Redis/Memorystore, Firestore');
                term.writeln('\x1b[1;33mSRE\x1b[0m         Prometheus, Grafana, Datadog, New Relic, Opsgenie');
                term.writeln('\x1b[1;33mAI\x1b[0m          Agents, runbook automation, inventory and validation workflows');
                term.writeln('\x1b[1;33mCode\x1b[0m        Python, Go, Bash, Linux');
            },
            move: () => {
                writeSection('AirAsia MOVE Current Work');
                if (currentExperience) {
                    term.writeln(`\x1b[1;33m${currentExperience.role}\x1b[0m`);
                    term.writeln(`${currentExperience.period} | ${currentExperience.location}`);
                    term.writeln('');
                    term.writeln(currentExperience.summary);
                    term.writeln('');
                }
                writeList([
                    'Cloud SQL consolidation and Landing Zone migration workstreams.',
                    'Redis/Memorystore and Firestore migration planning.',
                    'GKE foundation hardening, WIF/secrets Terraform updates, and GitOps validation.',
                    'SRE response across P0 gateway, 5xx spikes, and Cloud NAT exhaustion.',
                    'Kong, SSO/LB, Life GKE, Cloud Run, OTA, DNS, BigQuery, and scaling requests.',
                ]);
            },
            ai: () => {
                writeSection('AI Agents & Automation');
                writeList([
                    'Built agentic patterns for infra inventory and migration evidence.',
                    'Automated validation loops for cutover readiness and operational checks.',
                    'Turned runbook-heavy workflows into faster, repeatable command paths.',
                    'Use AI as an ops amplifier: context gathering, diff review, documentation, and guardrails.',
                ]);
            },
            resume: () => {
                openUrl('/Rahul_Prajapati.pdf');
            },
            experience: () => {
                writeSection('Work Experience');
                experiences.slice(0, 4).forEach((exp) => {
                    term.writeln(`\x1b[1;33m${exp.company}\x1b[0m - ${exp.role} (${exp.period})`);
                    term.writeln(`  - ${exp.summary}`);
                    if (exp.status === 'Current') {
                        term.writeln('  - Cloud SQL, Landing Zone, GKE, SRE, Redis, Firestore, AI automation');
                    }
                    term.writeln('');
                });
            },
            links: () => {
                writeSection('Links');
                term.writeln(`GitHub:   ${profile.links.github}`);
                term.writeln(`LinkedIn: ${profile.links.linkedin}`);
                term.writeln(`Medium:   ${profile.links.medium}`);
                term.writeln('');
                term.writeln('Open directly with: gh, li, medium');
            },
            contact: () => {
                writeSection('Contact Information');
                term.writeln(`Email: ${profile.email}`);
                term.writeln(`Phone: ${profile.phone}`);
                term.writeln(`Location: ${profile.location}`);
                term.writeln('');
                term.writeln(`LinkedIn: ${profile.links.linkedin.replace('https://', '')}`);
                term.writeln(`GitHub: ${profile.links.github.replace('https://', '')}`);
                term.writeln(`Medium: ${profile.links.medium.replace('https://', '')}`);
            },
            whoami: () => commands.about(),
            cv: () => commands.resume(),
            gh: () => openUrl(profile.links.github),
            github: () => openUrl(profile.links.github),
            li: () => openUrl(profile.links.linkedin),
            linkedin: () => openUrl(profile.links.linkedin),
            medium: () => openUrl(profile.links.medium),
            clear: () => {
                term.clear();
            },
            exit: () => {
                term.writeln('\r\n\x1b[1;32mGoodbye!\x1b[0m');
                setTimeout(onClose, 500);
            },
        };

        const commandNames = Object.keys(commands);

        const handleCommand = (cmd) => {
            const trimmedCmd = cmd.trim().toLowerCase();
            if (trimmedCmd) {
                commandHistory = [trimmedCmd, ...commandHistory.filter((item) => item !== trimmedCmd)].slice(0, 20);
                historyIndex = -1;
            }
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
            if (data === '\x1b[A') {
                if (commandHistory.length > 0) {
                    historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                    rewriteLine(commandHistory[historyIndex]);
                }
                return;
            }

            if (data === '\x1b[B') {
                if (historyIndex > 0) {
                    historyIndex -= 1;
                    rewriteLine(commandHistory[historyIndex]);
                } else {
                    historyIndex = -1;
                    rewriteLine('');
                }
                return;
            }

            const code = data.charCodeAt(0);

            if (code === 13) { // Enter
                handleCommand(currentLine);
            } else if (code === 9) { // Tab
                const match = commandNames.find((name) => name.startsWith(currentLine.trim().toLowerCase()));
                if (match) rewriteLine(match);
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
                    <span className="text-gray-400 text-sm">rahul@move:~/platform</span>
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
