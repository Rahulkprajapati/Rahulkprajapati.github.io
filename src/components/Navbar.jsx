import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion, useScroll, useSpring } from 'framer-motion';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
    { name: 'Home', href: '#home', isRoute: false },
    { name: 'About', href: '#about', isRoute: false },
    { name: 'Platform Lab', href: '#platform-lab', isRoute: false },
    { name: 'Experience', href: '#experience', isRoute: false },
    { name: 'Blogs', href: '/blogs', isRoute: true },
    { name: 'Contact', href: '#contact', isRoute: false },
];

const sectionIds = navLinks.filter((l) => !l.isRoute).map((l) => l.href.slice(1));

const Navbar = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const location = useLocation();
    const navigate = useNavigate();

    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

    // Solidify the bar once the hero starts scrolling away
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Highlight whichever section owns the upper third of the viewport
    useEffect(() => {
        if (location.pathname !== '/') return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActiveSection(visible.target.id);
            },
            { rootMargin: '-20% 0px -65% 0px', threshold: [0.1, 0.5, 1] }
        );

        sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean)
            .forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [location.pathname]);

    const handleNavClick = (href) => {
        setIsOpen(false);
        if (!href.startsWith('#')) return;

        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const isActive = (link) =>
        link.isRoute ? location.pathname === link.href : location.pathname === '/' && activeSection === link.href.slice(1);

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                scrolled ? 'backdrop-blur-xl' : 'backdrop-blur-sm'
            }`}
            style={{
                background: scrolled ? 'var(--surface-strong)' : 'transparent',
                borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
                boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
            }}
        >
            <div className="shell">
                <div className="flex h-16 items-center justify-between">
                    <button
                        onClick={() => handleNavClick('#home')}
                        className="group flex cursor-pointer items-center gap-3 border-none bg-transparent text-left"
                    >
                        <span
                            className="relative grid h-9 w-9 place-items-center rounded-lg font-mono text-xs font-medium transition-colors duration-300"
                            style={{ border: '1px solid var(--border-strong)', color: 'var(--text)' }}
                        >
                            RP
                            <span className="signal-dot absolute -right-0.5 -top-0.5" style={{ width: 5, height: 5 }} />
                        </span>
                        <span className="hidden sm:block">
                            <span className="block text-sm font-semibold tracking-tight" style={{ color: 'var(--text)' }}>
                                Rahul Prajapati
                            </span>
                            <span className="micro block" style={{ fontSize: '0.58rem' }}>
                                Platform Engineer
                            </span>
                        </span>
                    </button>

                    <div className="hidden items-center gap-1 md:flex">
                        {navLinks.map((link) => {
                            const active = isActive(link);
                            const classes =
                                'relative rounded-lg border-none bg-transparent px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-200';
                            const content = (
                                <>
                                    {link.name}
                                    {active && (
                                        <Motion.span
                                            layoutId="nav-active"
                                            className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full"
                                            style={{ background: 'var(--accent)' }}
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </>
                            );

                            return link.isRoute ? (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={classes}
                                    style={{ color: active ? 'var(--text)' : 'var(--text-muted)' }}
                                >
                                    {content}
                                </Link>
                            ) : (
                                <button
                                    key={link.name}
                                    onClick={() => handleNavClick(link.href)}
                                    className={`${classes} cursor-pointer`}
                                    style={{ color: active ? 'var(--text)' : 'var(--text-muted)' }}
                                >
                                    {content}
                                </button>
                            );
                        })}

                        <button
                            onClick={toggleTheme}
                            className="ml-2 grid h-9 w-9 cursor-pointer place-items-center rounded-full border transition-colors duration-200"
                            style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)', color: 'var(--text-muted)' }}
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <Motion.span
                                    key={darkMode ? 'sun' : 'moon'}
                                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                                    transition={{ duration: 0.2 }}
                                    className="grid place-items-center"
                                >
                                    {darkMode ? <FaSun size={17} /> : <FaMoon size={16} />}
                                </Motion.span>
                            </AnimatePresence>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border"
                            style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)', color: 'var(--text-muted)' }}
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? <FaSun size={17} /> : <FaMoon size={16} />}
                        </button>
                        <button
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border"
                            style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)', color: 'var(--text-muted)' }}
                            aria-label="Toggle navigation"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Reading progress */}
            <Motion.div
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left"
                style={{
                    scaleX: progress,
                    background: 'linear-gradient(90deg, var(--accent), var(--tech))',
                    opacity: scrolled ? 1 : 0,
                }}
            />

            <AnimatePresence>
                {isOpen && (
                    <Motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden backdrop-blur-xl md:hidden"
                        style={{ background: 'var(--surface-overlay)', borderTop: '1px solid var(--border)' }}
                    >
                        <div className="shell flex flex-col gap-1 py-4">
                            {navLinks.map((link) => {
                                const active = isActive(link);
                                const style = {
                                    color: active ? 'var(--text)' : 'var(--text-muted)',
                                    background: active ? 'var(--accent-soft)' : 'transparent',
                                };
                                return link.isRoute ? (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="rounded-xl px-3 py-3 text-base font-medium"
                                        style={style}
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <button
                                        key={link.name}
                                        onClick={() => handleNavClick(link.href)}
                                        className="cursor-pointer rounded-xl border-none px-3 py-3 text-left text-base font-medium"
                                        style={style}
                                    >
                                        {link.name}
                                    </button>
                                );
                            })}
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
