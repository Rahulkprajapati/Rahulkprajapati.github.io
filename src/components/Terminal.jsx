import React, { useEffect, useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { certifications, experiences, metrics, profile } from '../data/profile';

// ── ANSI helpers ────────────────────────────────────────────────────────────
// Truecolor escapes so the terminal uses the site's instrument palette exactly.
const rgb = (r, g, b) => (text) => `\x1b[38;2;${r};${g};${b}m${text}\x1b[0m`;
const mint = rgb(124, 245, 198);
const lilac = rgb(180, 164, 255);
const ink = rgb(232, 239, 235);
const dim = rgb(100, 113, 108);
const muted = rgb(154, 168, 162);
const alert = rgb(255, 122, 98);
const bold = (text) => `\x1b[1m${text}\x1b[22m`;

const PROMPT = `${mint('rahul')}${dim('@')}${ink('move')} ${lilac('~/platform')} ${dim('›')} `;
const PROMPT_WIDTH = 'rahul@move ~/platform › '.length;

const QUICK = ['help', 'whoami', 'status', 'experience', 'move', 'toolkit', 'certs', 'contact'];

const pad = (n) => String(n).padStart(2, '0');

// Edit distance for "did you mean" suggestions on typos
const distance = (a, b) => {
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        }
    }
    return dp[a.length][b.length];
};

const Terminal = ({ onClose }) => {
    const hostRef = useRef(null);
    const runRef = useRef(null);
    // Keep the latest onClose without re-creating the terminal when it changes
    const onCloseRef = useRef(onClose);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    // Modal behaviour: lock page scroll, close on Escape, restore focus after
    useEffect(() => {
        const previouslyFocused = document.activeElement;
        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => {
            if (e.key === 'Escape') onCloseRef.current();
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = overflow;
            window.removeEventListener('keydown', onKey);
            if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
        };
    }, []);

    useEffect(() => {
        let disposed = false;
        let term = null;
        let resizeObserver = null;
        const timers = [];

        // Wait for the web font: xterm measures glyph width once, at open().
        // Opening asynchronously also means React StrictMode's dev-only
        // mount/unmount/mount never creates and disposes a live terminal,
        // which is what used to throw xterm's `dimensions` error.
        document.fonts
            .load('13px "JetBrains Mono"')
            .catch(() => {})
            .then(() => {
                if (disposed || !hostRef.current) return;

                term = new XTerm({
                    cursorBlink: true,
                    cursorStyle: 'bar',
                    convertEol: true,
                    fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                    fontSize: 13,
                    lineHeight: 1.45,
                    letterSpacing: 0,
                    scrollback: 2000,
                    allowProposedApi: false,
                    theme: {
                        background: '#07090b',
                        foreground: '#cfd9d4',
                        cursor: '#7cf5c6',
                        cursorAccent: '#07090b',
                        selectionBackground: 'rgba(124, 245, 198, 0.22)',
                        black: '#0b0f11',
                        red: '#ff7a62',
                        green: '#7cf5c6',
                        yellow: '#f5d67c',
                        blue: '#8fb8ff',
                        magenta: '#b4a4ff',
                        cyan: '#7ce0f5',
                        white: '#cfd9d4',
                        brightBlack: '#64716c',
                        brightRed: '#ff9a86',
                        brightGreen: '#a8fadb',
                        brightYellow: '#fae3a0',
                        brightBlue: '#b3cfff',
                        brightMagenta: '#cdc2ff',
                        brightCyan: '#a8ecfa',
                        brightWhite: '#e8efeb',
                    },
                });

                const fit = new FitAddon();
                term.loadAddon(fit);
                term.open(hostRef.current);
                fit.fit();
                term.focus();

                // Escape inside xterm would otherwise be swallowed as input
                term.attachCustomKeyEventHandler((e) => {
                    if (e.type === 'keydown' && e.key === 'Escape') {
                        onCloseRef.current();
                        return false;
                    }
                    return true;
                });

                resizeObserver = new ResizeObserver(() => fit.fit());
                resizeObserver.observe(hostRef.current);

                const w = (text = '') => term.writeln(text);
                const rule = () => w(dim('─'.repeat(Math.min(term.cols - 2, 72))));
                const section = (title, meta = '') => {
                    w('');
                    w(`${mint('▍')} ${bold(ink(title.toUpperCase()))}${meta ? `  ${dim(meta)}` : ''}`);
                    rule();
                };
                const row = (label, value, width = 14) => w(`  ${dim(label.padEnd(width))}${value}`);
                const bullet = (text) => w(`  ${mint('›')} ${text}`);
                const openUrl = (url, label = url) => {
                    window.open(url, '_blank', 'noopener,noreferrer');
                    w(`  ${dim('opening')} ${lilac(label)}`);
                };

                const current = experiences.find((exp) => exp.status === 'Current');
                const files = {
                    'about.md': () => commands.whoami(),
                    'experience/': () => commands.experience(),
                    'toolkit.yaml': () => commands.toolkit(),
                    'certs.txt': () => commands.certs(),
                    'resume.pdf': () => commands.resume(),
                };

                const commands = {
                    help: () => {
                        section('Commands', 'tab completes · ↑↓ history · esc closes');
                        [
                            ['whoami', 'who I am and what I build'],
                            ['status', 'telemetry from the CV'],
                            ['experience', 'career manifest · try `experience 05`'],
                            ['move', 'current work at AirAsia MOVE'],
                            ['ai', 'agents and automation'],
                            ['toolkit', 'daily platform stack'],
                            ['certs', 'certifications'],
                            ['contact', 'email and links'],
                            ['resume', 'open the PDF'],
                            ['ls · cat', 'browse like a filesystem'],
                            ['clear · exit', ''],
                        ].forEach(([cmd, desc]) => w(`  ${mint(cmd.padEnd(14))}${muted(desc)}`));
                        w('');
                        w(`  ${dim('shortcuts')}  ${muted('gh · li · medium · cv · date · history')}`);
                    },
                    whoami: () => {
                        section(profile.name, profile.headline);
                        row('role', ink(`${profile.title}, ${current?.company ?? ''}`));
                        row('base', ink(`${profile.location} · IST (UTC+5:30)`));
                        row('since', ink(`${profile.startYear} · ${metrics[0].value} ${metrics[0].unit} in production`));
                        row('clouds', ink('GCP · AWS · Azure'));
                        w('');
                        w(`  ${muted(profile.summary)}`);
                        w('');
                        bullet('Cloud systems that stay calm under pressure.');
                        bullet('Boring infrastructure for users, deeply intentional engineering underneath.');
                    },
                    status: () => {
                        section('Telemetry', 'every figure traces to a CV entry');
                        metrics.forEach((m) => {
                            const value = `${m.value}${/^[a-z]/i.test(m.unit) ? ' ' : ''}${m.unit}`;
                            w(`  ${mint('●')} ${dim(m.label.toUpperCase().padEnd(24))}${bold(ink(value.padEnd(9)))}${dim(m.source)}`);
                        });
                        w('');
                        w(`  ${mint('all systems nominal')}`);
                    },
                    experience: (arg) => {
                        const total = experiences.length;
                        if (arg) {
                            const n = parseInt(arg, 10);
                            const exp = experiences[total - n];
                            if (!exp) {
                                w(`  ${alert(`no entry ${arg}`)} ${dim(`— use 01 to ${pad(total)}`)}`);
                                return;
                            }
                            section(`${pad(n)} · ${exp.company}`, exp.period);
                            row('role', lilac(exp.role));
                            row('base', ink(exp.location));
                            w('');
                            w(`  ${muted(exp.summary)}`);
                            w('');
                            exp.description.forEach((item, i) => w(`  ${dim(pad(i + 1))}  ${item}`));
                            return;
                        }
                        section('Manifest', `RP-${pad(total)} · ${profile.startYear} — present`);
                        experiences.forEach((exp, i) => {
                            const n = pad(total - i);
                            const tag = exp.status ? ` ${mint('● ' + exp.status.toLowerCase())}` : '';
                            w(`  ${dim(n)}  ${dim(exp.period.padEnd(22))}${bold(ink(exp.company))}${tag}`);
                            w(`      ${' '.repeat(22)}${lilac(exp.role)}`);
                        });
                        w('');
                        w(`  ${muted('details:')} ${mint('experience 05')}`);
                    },
                    move: () => {
                        if (!current) return;
                        section('AirAsia MOVE', current.period);
                        row('role', lilac(current.role));
                        w('');
                        w(`  ${muted(current.summary)}`);
                        w('');
                        [
                            'Cloud SQL consolidation and Landing Zone migration workstreams',
                            'Redis / Memorystore and Firestore migration planning',
                            'GKE foundation hardening, WIF and secrets in Terraform, GitOps validation',
                            'SRE response: P0 gateway incident, 5xx spikes, Cloud NAT exhaustion',
                        ].forEach(bullet);
                        w('');
                        w(`  ${muted('full entry:')} ${mint('experience 05')}`);
                    },
                    ai: () => {
                        section('AI agents & automation');
                        [
                            'Agentic patterns for infrastructure inventory and migration evidence',
                            'Automated validation loops for cutover readiness and operational checks',
                            'Runbook-heavy workflows turned into fast, repeatable command paths',
                            'AI as an ops amplifier: context, diff review, docs, guardrails',
                        ].forEach(bullet);
                    },
                    toolkit: () => {
                        section('Toolkit', 'toolkit.yaml');
                        [
                            ['cloud', 'GCP, AWS, Azure, IAM, VPC'],
                            ['runtime', 'Kubernetes, GKE, Docker, Helm, Argo CD, Istio'],
                            ['iac', 'Terraform, Ansible, GitOps'],
                            ['delivery', 'GitLab CI, Jenkins, CircleCI, GitHub Actions, Harness'],
                            ['data', 'Cloud SQL, DMS, Redis / Memorystore, Firestore'],
                            ['sre', 'Prometheus, Grafana, Datadog, New Relic'],
                            ['ai', 'agents, runbook automation, validation workflows'],
                            ['code', 'Python, Go, Bash, Linux'],
                        ].forEach(([k, v]) => w(`  ${lilac((k + ':').padEnd(11))}${ink(v)}`));
                    },
                    certs: () => {
                        section('Certifications', `${certifications.length} credentials`);
                        certifications.forEach((c) => w(`  ${mint('✓')} ${ink(c)}`));
                    },
                    contact: () => {
                        section('Contact');
                        row('email', mint(profile.email));
                        row('github', ink(profile.links.github.replace('https://', '')));
                        row('linkedin', ink(profile.links.linkedin.replace('https://', '')));
                        row('medium', ink(profile.links.medium.replace('https://', '')));
                        w('');
                        w(`  ${muted('open directly:')} ${mint('gh')} ${dim('·')} ${mint('li')} ${dim('·')} ${mint('medium')}`);
                    },
                    resume: () => openUrl('/Rahul_Prajapati.pdf', 'Rahul_Prajapati.pdf'),
                    ls: () => {
                        w('');
                        w(
                            '  ' +
                                Object.keys(files)
                                    .map((f) => (f.endsWith('/') ? lilac(f) : f.endsWith('.pdf') ? mint(f) : ink(f)))
                                    .join('   '),
                        );
                    },
                    cat: (arg) => {
                        const file = files[arg] ?? files[`${arg}/`];
                        if (file) file();
                        else w(`  ${alert(`cat: ${arg || '(missing file)'}: no such file`)} ${dim('— try `ls`')}`);
                    },
                    date: () => {
                        const fmt = (tz) => new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', weekday: 'short' }).format(new Date());
                        w('');
                        row('bangalore', ink(`${fmt('Asia/Kolkata')} IST`));
                        row('london', ink(fmt('Europe/London')));
                        row('berlin', ink(fmt('Europe/Berlin')));
                    },
                    history: () => {
                        w('');
                        history.slice().reverse().forEach((cmd, i) => w(`  ${dim(String(i + 1).padStart(3))}  ${cmd}`));
                    },
                    sudo: () => w(`  ${alert('permission denied')} ${dim('— this incident has been logged to #platform-oncall')}`),
                    gh: () => openUrl(profile.links.github, 'github'),
                    li: () => openUrl(profile.links.linkedin, 'linkedin'),
                    medium: () => openUrl(profile.links.medium, 'medium'),
                    clear: () => term.clear(),
                    exit: () => {
                        w(`  ${dim('session closed')}`);
                        timers.push(setTimeout(() => onCloseRef.current(), 250));
                    },
                };
                // Aliases
                Object.assign(commands, {
                    about: commands.whoami,
                    skills: commands.toolkit,
                    cv: commands.resume,
                    github: commands.gh,
                    linkedin: commands.li,
                    open: (arg) => commands.cat(arg),
                    quit: commands.exit,
                });

                const names = Object.keys(commands);
                let line = '';
                let history = [];
                let cursor = -1;
                let booting = true;

                const prompt = () => term.write(`\r\n${PROMPT}`);
                const rewrite = (value) => {
                    term.write(`\r\x1b[2K${PROMPT}${value}`);
                    line = value;
                };

                const run = (raw) => {
                    const input = raw.trim();
                    const [name, ...args] = input.split(/\s+/);
                    const cmd = (name || '').toLowerCase();
                    if (input) {
                        history = [input, ...history.filter((h) => h !== input)].slice(0, 50);
                        cursor = -1;
                    }
                    if (commands[cmd]) {
                        commands[cmd](args.join(' '));
                    } else if (cmd) {
                        const best = names
                            .map((n) => [n, distance(cmd, n)])
                            .sort((a, b) => a[1] - b[1])[0];
                        w(`  ${alert(`command not found: ${cmd}`)}`);
                        if (best && best[1] <= 2) w(`  ${dim('did you mean')} ${mint(best[0])}${dim('?')}`);
                        else w(`  ${dim('type')} ${mint('help')} ${dim('for the command list')}`);
                    }
                    line = '';
                    if (cmd !== 'exit' && cmd !== 'quit') prompt();
                };

                // Lets the quick-command chips drive the same code path as typing
                runRef.current = (cmd) => {
                    if (booting) return;
                    rewrite(cmd);
                    run(cmd);
                    term.focus();
                };

                // Boot sequence — skippable, and derived from real data
                const boot = [
                    `${bold(ink('RahulOS'))} ${dim('2.0 — platform shell')}`,
                    '',
                    `${mint('[  OK  ]')} ${muted('Mounted')}   ${ink('/experience')}   ${dim(`${experiences.length} entries · ${profile.startYear} — present`)}`,
                    `${mint('[  OK  ]')} ${muted('Loaded')}    ${ink('toolkit')}       ${dim('GCP · AWS · Azure · Kubernetes · Terraform')}`,
                    `${mint('[  OK  ]')} ${muted('Verified')}  ${ink('certs')}         ${dim(`${certifications.length} credentials`)}`,
                    `${mint('[  OK  ]')} ${muted('Linked')}    ${ink('profiles')}      ${dim('github · linkedin · medium')}`,
                    '',
                    `${muted('Type')} ${mint('help')}${muted(', or click a command above.')}`,
                ];
                let printed = 0;
                const printNext = () => {
                    if (printed < boot.length) w(boot[printed++]);
                };
                // A keypress skips the animation: flush whatever hasn't printed yet
                const finishBoot = () => {
                    if (!booting) return;
                    booting = false;
                    timers.forEach(clearTimeout);
                    while (printed < boot.length) printNext();
                    prompt();
                    setReady(true);
                };
                const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (reduced) {
                    finishBoot();
                } else {
                    boot.forEach((_, i) => timers.push(setTimeout(printNext, 90 + i * 110)));
                    timers.push(setTimeout(finishBoot, 90 + boot.length * 110 + 60));
                }

                term.onData((data) => {
                    if (booting) {
                        finishBoot();
                        return;
                    }
                    if (data === '\x1b[A') {
                        if (history.length) {
                            cursor = Math.min(cursor + 1, history.length - 1);
                            rewrite(history[cursor]);
                        }
                        return;
                    }
                    if (data === '\x1b[B') {
                        if (cursor > 0) {
                            cursor -= 1;
                            rewrite(history[cursor]);
                        } else {
                            cursor = -1;
                            rewrite('');
                        }
                        return;
                    }
                    if (data === '\r') return run(line);
                    if (data === '\t') {
                        const partial = line.trim().toLowerCase();
                        const matches = names.filter((n) => n.startsWith(partial));
                        if (matches.length === 1) rewrite(matches[0] + ' ');
                        else if (matches.length > 1 && partial) {
                            w('');
                            w(`  ${matches.map((m) => mint(m)).join(dim('  ·  '))}`);
                            term.write(PROMPT + line);
                        }
                        return;
                    }
                    if (data === '\x0c') {
                        // Ctrl+L
                        term.clear();
                        rewrite(line);
                        return;
                    }
                    if (data === '\x7f') {
                        if (line.length) {
                            line = line.slice(0, -1);
                            term.write('\b \b');
                        }
                        return;
                    }
                    // Printable input, including multi-character pastes
                    const printable = [...data].filter((ch) => ch >= ' ' && ch <= '~').join('');
                    if (printable && PROMPT_WIDTH + line.length + printable.length < term.cols * 4) {
                        line += printable;
                        term.write(printable);
                    }
                });
            });

        return () => {
            disposed = true;
            timers.forEach(clearTimeout);
            resizeObserver?.disconnect();
            runRef.current = null;
            term?.dispose();
        };
    }, []);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Interactive terminal"
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
        >
            <Motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 backdrop-blur-sm"
                style={{ background: 'rgba(3, 5, 6, 0.72)' }}
                onMouseDown={() => onCloseRef.current()}
            />

            <Motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                // Always dark, whichever site theme is active
                className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl"
                style={{
                    background: '#07090b',
                    border: '1px solid rgba(206, 230, 219, 0.14)',
                    boxShadow: '0 40px 120px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(0,0,0,0.5), 0 0 60px -20px rgba(124,245,198,0.18)',
                }}
            >
                {/* Title bar */}
                <div
                    className="flex items-center justify-between gap-4 px-5 py-3"
                    style={{ borderBottom: '1px solid rgba(206, 230, 219, 0.09)' }}
                >
                    <div className="flex min-w-0 items-center gap-3">
                        <span
                            className="inline-block h-1.5 w-1.5 rounded-full"
                            style={{ background: '#7cf5c6', boxShadow: '0 0 10px #7cf5c6' }}
                        />
                        <span className="truncate font-mono text-[0.66rem] uppercase tracking-[0.16em]" style={{ color: '#e8efeb' }}>
                            Session 01
                        </span>
                        <span className="hidden truncate font-mono text-[0.66rem] uppercase tracking-[0.16em] sm:inline" style={{ color: '#64716c' }}>
                            rahul@move:~/platform
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.16em] sm:inline" style={{ color: '#64716c' }}>
                            Esc to close
                        </span>
                        <button
                            onClick={() => onCloseRef.current()}
                            aria-label="Close terminal"
                            className="grid h-7 w-7 cursor-pointer place-items-center rounded-full transition-colors"
                            style={{ border: '1px solid rgba(206, 230, 219, 0.18)', color: '#9aa8a2', background: 'transparent' }}
                        >
                            <FaTimes size={10} />
                        </button>
                    </div>
                </div>

                {/* Quick commands, for anyone who'd rather not type */}
                <div
                    className="flex items-center gap-2 overflow-x-auto px-5 py-2.5"
                    style={{ borderBottom: '1px solid rgba(206, 230, 219, 0.09)' }}
                >
                    <span className="flex-shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.16em]" style={{ color: '#64716c' }}>
                        Run
                    </span>
                    {QUICK.map((cmd) => (
                        <button
                            key={cmd}
                            onClick={() => runRef.current?.(cmd)}
                            disabled={!ready}
                            className="flex-shrink-0 cursor-pointer rounded-full px-2.5 py-1 font-mono text-[0.7rem] transition-colors duration-150 hover:bg-[rgba(124,245,198,0.12)] hover:text-[#7cf5c6] disabled:cursor-default disabled:opacity-40"
                            style={{ border: '1px solid rgba(206, 230, 219, 0.14)', color: '#cfd9d4', background: 'transparent' }}
                        >
                            {cmd}
                        </button>
                    ))}
                </div>

                {/* xterm host */}
                <div className="px-4 pt-3 pb-1" style={{ height: 'min(62vh, 30rem)' }}>
                    <div ref={hostRef} className="h-full w-full" />
                </div>

                {/* Status bar */}
                <div
                    className="flex items-center justify-between gap-4 px-5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.16em]"
                    style={{ borderTop: '1px solid rgba(206, 230, 219, 0.09)', color: '#64716c' }}
                >
                    <span className="truncate">↑↓ history · tab complete · ctrl+l clear</span>
                    <span className="hidden flex-shrink-0 sm:inline">
                        UTC+5:30 · v{import.meta.env.APP_VERSION}
                    </span>
                </div>
            </Motion.div>
        </div>
    );
};

export default Terminal;
