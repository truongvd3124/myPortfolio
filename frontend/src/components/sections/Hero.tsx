import React from 'react';
import { Boxes } from '../common/BoxesCore';

const Hero: React.FC = () => {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white text-center relative overflow-hidden">
            {/* Background Pattern with Gradient - cyan/blue theme */}
            <div className="absolute inset-0 opacity-60 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/15 to-purple-500/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-2xl"></div>
            </div>
            
            {/* Interactive Boxes Background */}
            <Boxes />
            
            <div className="relative z-20 max-w-4xl px-8">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg animate-fade-in">
                    Hi, I'm{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
                        Duy Truong
                    </span>
                </h1>
                <p className="text-xl md:text-2xl mb-4 opacity-90 animate-slide-up">
                        I'm an Final-year Student in CET major
                </p>
                
                {/* Social Contact Icons */}
                <div className="flex justify-center gap-6 mb-4">
                    <a
                        href="https://github.com/dtruowfng3"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform"
                    >
                        <svg
                            className="size-8"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.2-.25-4.55-1.11-4.55-4.92c0-1.09.39-1.98 1.03-2.68c-.1-.25-.45-1.28.1-2.67c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.39.2 2.42.1 2.67c.64.7 1.03 1.59 1.03 2.68c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
                            />
                        </svg>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/truong-vo-814922345/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform"
                    >
                        <svg
                            className="size-8"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                            />
                        </svg>
                    </a>
                    <a
                        href="https://www.facebook.com/d.truowfng.3/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform"
                    >
                        <svg
                            className="size-8"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                            />
                        </svg>
                    </a>
                </div>
            </div>
            
            {/* Scroll Down Animation */}
            <button 
                onClick={scrollToAbout}
                className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white z-30 scroll-down-arrow hover:opacity-80 transition-opacity duration-300 cursor-pointer"
            >
                <span className="scroll-down-span"></span>
            </button>
        </section>
    );
};

export default Hero;