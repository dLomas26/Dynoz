import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });

      if (linksRef.current) {
        gsap.from(linksRef.current.children, {
          opacity: 0,
          y: -12,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power3.out',
          delay: 0.4,
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Update scroll progress
      if (progressRef.current) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        progressRef.current.style.transform = `scaleX(${scrollPercent})`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Magnetic effect for CTA button
  const handleCTAMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleCTAReset = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="scroll-progress"
        style={{ transform: 'scaleX(0)' }}
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark-950/95 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" ref={logoRef} className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
                <Sparkles size={18} className="text-white" />
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', filter: 'blur(8px)', zIndex: -1 }} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Dynoz AI
              </span>
            </a>

            {/* Desktop Links */}
            <div ref={linksRef} className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full rounded-full" />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#contact"
                className="btn-primary text-sm px-5 py-2.5"
                onMouseMove={handleCTAMagnetic}
                onMouseLeave={handleCTAReset}
              >
                Request a Demo
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white transition-colors relative"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Menu</span>
              <div className={`transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`}>
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-dark-950/95 backdrop-blur-xl transition-opacity duration-500"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-16 left-0 right-0 p-6 transition-all duration-500 ${
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1 mb-8">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-left px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors text-lg font-medium"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-primary w-full justify-center text-base py-4"
          >
            Request a Demo
          </a>
        </div>
      </div>
    </>
  );
}
