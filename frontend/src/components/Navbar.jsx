import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wind, BookOpen, MessageSquare, Music, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Stories', path: '/stories', icon: <BookOpen size={18} /> },
        { name: 'AI Guru', path: '/chatbot', icon: <MessageSquare size={18} /> },
        { name: 'Stotras', path: '/stotras', icon: <Music size={18} /> },
        { name: 'Festivals', path: '/festivals', icon: <Calendar size={18} /> },
        { name: 'Lifestyle', path: '/lifestyle', icon: <Sparkles size={18} /> },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 glass-card mx-auto top-4 max-w-[90%] left-0 right-0' : 'py-6 bg-transparent top-0'
            }`}>
            <div className="container flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 logo">
                    <Wind className="text-primary-saffron" size={32} />
                    <span>Grihastu</span>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 items-center list-none">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`flex items-center gap-2 font-medium transition-colors hover:text-primary-saffron ${location.pathname === link.path ? 'text-primary-saffron' : 'text-gray-700'
                                    }`}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link to="/chatbot" className="btn-primary py-2 px-6">Ask Guru</Link>
                    </li>
                </ul>

                {/* Mobile Toggle */}
                <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 w-full glass-card mt-2 p-6 shadow-xl"
                    >
                        <ul className="flex flex-col gap-4 list-none">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 text-lg font-medium p-2 hover:bg-orange-50 rounded-lg"
                                    >
                                        {link.icon}
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
