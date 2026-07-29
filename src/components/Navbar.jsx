import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleNavClick = (href) => {
        setIsOpen(false);
        if (href.startsWith('#')) {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.querySelector(href);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                const element = document.querySelector(href);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navLinks = [
        { name: 'Home', href: '#home', isRoute: false },
        { name: 'About', href: '#about', isRoute: false },
        { name: 'Platform Lab', href: '#platform-lab', isRoute: false },
        { name: 'Experience', href: '#experience', isRoute: false },
        { name: 'Blogs', href: '/blogs', isRoute: true },
        { name: 'Contact', href: '#contact', isRoute: false },
    ];

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-gray-200/80 bg-white/85 shadow-sm backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-gray-950/85">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <button onClick={() => handleNavClick('#home')} className="flex items-center gap-3 bg-transparent border-none text-left cursor-pointer">
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-gray-950 text-sm font-black text-white dark:bg-white dark:text-gray-950">RP</span>
                        <span className="hidden sm:block">
                            <span className="block text-sm font-black text-gray-950 dark:text-white">Rahul Prajapati</span>
                            <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400">Platform Engineer</span>
                        </span>
                    </button>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center gap-1">
                            {navLinks.map((link) => (
                                link.isRoute ? (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="rounded-lg px-3 py-2 text-sm font-bold text-gray-700 transition hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-red-300"
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <button
                                        key={link.name}
                                        onClick={() => handleNavClick(link.href)}
                                        className="rounded-lg border-none bg-transparent px-3 py-2 text-sm font-bold text-gray-700 transition hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-red-300"
                                    >
                                        {link.name}
                                    </button>
                                )
                            ))}
                            <button
                                onClick={toggleTheme}
                                className="ml-2 grid h-10 w-10 place-items-center rounded-lg text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                                aria-label="Toggle Dark Mode"
                            >
                                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="grid h-10 w-10 place-items-center rounded-lg text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                            aria-label="Toggle Dark Mode"
                        >
                            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                        </button>
                        <button
                            onClick={toggleMenu}
                            className="grid h-10 w-10 place-items-center rounded-lg text-gray-700 transition hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-red-300"
                            aria-label="Toggle Navigation"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <Motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden border-t border-gray-200 bg-white shadow-lg dark:border-white/10 dark:bg-gray-950"
                >
                    <div className="px-4 py-4 space-y-1 sm:px-6 flex flex-col">
                        {navLinks.map((link) => (
                            link.isRoute ? (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block rounded-lg px-3 py-3 text-base font-bold text-gray-700 hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-red-300"
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <button
                                    key={link.name}
                                    onClick={() => handleNavClick(link.href)}
                                    className="block rounded-lg border-none bg-transparent px-3 py-3 text-left text-base font-bold text-gray-700 hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-red-300"
                                >
                                    {link.name}
                                </button>
                            )
                        ))}
                    </div>
                </Motion.div>
            )}
        </nav>
    );
};

export default Navbar;
