'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Handle scroll behavior for shadow and background opacity
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 900);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-6 left-0 right-0 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
        ${isScrolled ? 'translate-y-0' : 'translate-y-0'} 
        transition-all duration-300 ease-in-out`}
        >
            <div
                className={`w-full rounded-full py-3 md:py-4 px-4 sm:px-6 lg:px-8
          flex items-center justify-between
          ${isScrolled
                        ? 'bg-[#db3246] backdrop-blur-sm shadow-lg'
                        : 'bg-[#db3246] shadow-md'}`}
                aria-label="Main navigation"
            >
                {/* Left: Logo + Menu */}
                <div className="flex items-center gap-6 md:gap-12">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl font-nexa-heavy tracking-tight text-white hover:opacity-90 transition-opacity focus-visible:outline-white focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:rounded-sm"
                        aria-label="Guava home"
                    >
                        <Image
                            src="/logo.svg" // Replace with your actual image path
                            alt="Guava Logo"
                            width={40}
                            height={40}
                            priority
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex gap-8 text-sm font-nexa-heavy text-white">
                        {['Work', 'Services', 'About'].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="relative py-2 hover:text-white/80 transition-colors duration-200 
                  focus-visible:outline-white focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:rounded-sm
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
                  after:bg-white after:transition-all after:duration-300
                  hover:after:w-full"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right: Call to Action & Mobile menu button */}
                <div className="flex items-center gap-4">
                    <Link
                        href="#contact"
                        className="inline-flex items-center px-5 py-2 text-sm border-2 border-white font-nexa-heavy text-white bg-[#db3246] rounded-full
              hover:bg-white/90 focus:bg-white/90 active:scale-[0.98]
              transition-all duration-200 
              focus-visible:outline-white focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:rounded-full
              shadow-sm"
                    >
                        Start the Conversation
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="inline-flex md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors
              focus-visible:outline-white focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:rounded-full"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" aria-hidden="true" />
                        ) : (
                            <Menu className="h-5 w-5" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            <div
                id="mobile-menu"
                className={`md:hidden absolute top-full left-4 right-4 mt-2 rounded-xl bg-[#db3246] shadow-lg transform origin-top
          ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}
          transition-all duration-200 ease-in-out`}
                aria-hidden={!mobileMenuOpen}
            >
                <nav className="flex flex-col p-4 space-y-3 text-base font-nexa-heavy text-white">
                    {['Work', 'Services', 'About'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="py-3 px-4 hover:bg-white/10 rounded-lg transition-colors
                focus-visible:outline-white focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:rounded-lg"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <hr className="border-white/20 my-1" />
                    <Link
                        href="#contact"
                        className="py-3 px-4 bg-black text-white rounded-lg
              hover:bg-white/90 transition-colors
              focus-visible:outline-white focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Contact Us
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;