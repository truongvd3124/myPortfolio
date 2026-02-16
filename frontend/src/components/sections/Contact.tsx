"use client";
import React from "react";
import ExternalLinkIcon from "../ui/ExternalLinkIcon";
import LoveReact from "../ui/LoveReact";
import { SOCIAL_LINKS, CONTACT_LINKS } from "../../utils/constants";

const Contact: React.FC = () => {
    const navLinks = [
        { name: "Hero", href: "#hero" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "My Worlds", href: "#my-worlds" },
    ];

    const scrollToSection = (href: string) => {
        const sectionId = href.replace('#', '');
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const socialIcons = [
        {
            name: "GitHub",
            href: SOCIAL_LINKS.GITHUB,
            svg: (
                <svg
                    className="size-6 transition-transform duration-200 hover:scale-110"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.2-.25-4.55-1.11-4.55-4.92c0-1.09.39-1.98 1.03-2.68c-.1-.25-.45-1.28.1-2.67c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.39.2 2.42.1 2.67c.64.7 1.03 1.59 1.03 2.68c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
                    ></path>
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            href: SOCIAL_LINKS.LINKEDIN,
            svg: (
                <svg
                    className="size-6 transition-transform duration-200 hover:scale-110"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                    ></path>
                </svg>
            ),
        },
        {
            name: "Facebook",
            href: SOCIAL_LINKS.FACEBOOK,
            svg: (
                <svg
                    className="size-6 transition-transform duration-200 hover:scale-110"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                    ></path>
                </svg>
            ),
        },
    ];

    return (
        <footer id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950">
            <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
                <div className="mb-6 flex items-center justify-center">
                    <img
                        src="/android-chrome-192x192.png"
                        alt="Duy Truong Logo"
                        className="w-12 h-12 mr-3"
                    />
                    <span className="text-white text-3xl font-extrabold tracking-wide">
                        Duy Truong
                    </span>
                </div>

                <nav className="mb-6 w-full">
                    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-base font-medium">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(link.href);
                                    }}
                                    className="text-slate-300 hover:text-cyan-400 transition-all duration-300 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="my-6 flex flex-wrap justify-center gap-4 text-sm">
                    {socialIcons.map((icon) => (
                        <a
                            key={icon.name}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={icon.name}
                            className="text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                            href={icon.href}
                        >
                            {icon.svg}
                        </a>
                    ))}
                </div>

                <div className="text-center mb-6">
                    <a
                        href={CONTACT_LINKS.EMAIL}
                        className="group/contact-btn relative inline-flex items-center justify-center bg-slate-800/50 text-cyan-300 border border-cyan-500/30 px-8 py-3 rounded-lg font-semibold hover:text-slate-100 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-md hover:shadow-cyan-500/20 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500 before:to-blue-500 before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0"
                    >
                        <span className="relative z-10 transition-opacity duration-300 group-hover/contact-btn:opacity-0">Get In Touch</span>
                        <ExternalLinkIcon
                            className="absolute w-6 h-6 text-white transition-opacity duration-300 opacity-0 group-hover/contact-btn:opacity-100 z-20"
                        />
                    </a>
                </div>

                {/* Love React Buttons */}
                <div className="flex flex-col items-center gap-3 mb-6">
                    <p className="text-sm text-slate-400">Show some love</p>
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        {[
                            { color: "rgb(34, 211, 238)", label: "Cyan" },      // Cyan
                            { color: "rgb(168, 85, 247)", label: "Purple" },   // Purple
                            { color: "rgb(236, 72, 153)", label: "Pink" },    // Pink
                            { color: "rgb(239, 68, 68)", label: "Red" },      // Red
                            { color: "rgb(34, 197, 94)", label: "Green" }      // Green
                        ].map((heart, index) => (
                            <div key={index} className="flex flex-col items-center gap-1">
                                <LoveReact
                                    color={heart.color}
                                    size={45}
                                    onToggle={(isLiked) => {
                                        console.log(`${heart.label} ${isLiked ? "Liked!" : "Unliked!"}`);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-center text-xs text-slate-400 mt-4">
                    &copy; {new Date().getFullYear()} Duy Truong. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Contact;