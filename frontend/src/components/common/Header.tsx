import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const scrollToSection = (sectionId: string) => {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        if (isMobileMenuOpen) {
            closeMobileMenu();
        }
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const sectionId = href.replace('#', '');
        scrollToSection(sectionId);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
            isScrolled ? 'bg-slate-950/95 backdrop-blur-md' : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex justify-between items-center py-4">
                    {/* Brand */}
                    <a 
                        href="#hero" 
                        onClick={(e) => handleNavClick(e, '#hero')}
                        className="text-2xl font-black text-slate-200 hover:text-cyan-600 transition-colors duration-300"
                    >
                        dTruong
                    </a>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8 justify-end">
                            {[
                                { href: '#about', label: 'About' },
                                { href: '#projects', label: 'Projects' },
                                { href: '#games', label: 'Games' },
                                { href: '#my-worlds', label: 'My Worlds' },
                                { href: '#contact', label: 'Contact' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <a 
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        className="text-slate-200 font-bold px-4 py-2 rounded-lg hover:text-cyan-400 hover:bg-slate-800 transition-all duration-300"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    
                    {/* Mobile Menu Button */}
                    <button 
                        onClick={toggleMobileMenu}
                        className="md:hidden text-slate-200 text-2xl hover:text-cyan-400 transition-colors duration-300"
                    >
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
                
                {/* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 overflow-hidden ${
                    isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <nav className="bg-slate-950/95 backdrop-blur-md border-t border-slate-800">
                        <ul className="flex flex-col space-y-2 py-4 items-end">
                            {[
                                { href: '#about', label: 'About' },
                                { href: '#projects', label: 'Projects' },
                                { href: '#games', label: 'Games' },
                                { href: '#my-worlds', label: 'My Worlds' },
                                { href: '#contact', label: 'Contact' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <a 
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        className="block text-slate-200 font-bold px-6 py-3 hover:text-cyan-400 hover:bg-slate-800 transition-all duration-300"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;