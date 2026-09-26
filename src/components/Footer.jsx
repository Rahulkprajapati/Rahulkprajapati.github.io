import React from 'react';
import { FaArrowUp, FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';
import { profile } from '../data/profile';

const socials = [
    { key: 'github', label: 'GitHub', icon: FaGithub },
    { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedin },
    { key: 'medium', label: 'Medium', icon: FaMedium },
];

const Footer = () => {
    return (
        <footer className="relative" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="shell py-12">
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center gap-3 md:justify-start">
                            <span
                                className="grid h-9 w-9 place-items-center rounded-lg font-mono text-xs font-medium"
                                style={{ border: '1px solid var(--border-strong)', color: 'var(--text)' }}
                            >
                                RP
                            </span>
                            <span className="text-sm font-semibold tracking-tight" style={{ color: 'var(--text)' }}>
                                {profile.name}
                            </span>
                        </div>
                        <p className="mt-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                            {profile.title} &middot; {profile.location}
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        {socials.map((social) => {
                            const Icon = social.icon;
                            return (
                            <a
                                key={social.key}
                                href={profile.links[social.key]}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="grid h-10 w-10 place-items-center rounded-xl transition-transform duration-200 hover:-translate-y-0.5"
                                style={{ border: '1px solid var(--border)', background: 'var(--surface-muted)', color: 'var(--text-muted)' }}
                            >
                                <Icon size={17} />
                            </a>
                            );
                        })}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            aria-label="Back to top"
                            className="ml-1 grid h-10 w-10 cursor-pointer place-items-center rounded-xl transition-transform duration-200 hover:-translate-y-0.5"
                            style={{ border: '1px solid var(--border)', background: 'var(--surface-muted)', color: 'var(--text-muted)' }}
                        >
                            <FaArrowUp size={15} />
                        </button>
                    </div>
                </div>

                <div
                    className="mt-10 flex flex-col items-center justify-between gap-2 pt-6 text-center text-xs sm:flex-row sm:text-left"
                    style={{ borderTop: '1px solid var(--border)', color: 'var(--text-subtle)' }}
                >
                    <p className="micro">&copy; {new Date().getFullYear()} {profile.name}</p>
                    <p className="micro">Build v{import.meta.env.APP_VERSION} · React · Vite · Tailwind</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
