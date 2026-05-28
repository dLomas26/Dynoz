import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        onEnter: () => {
          const items = contentRef.current!.querySelectorAll('.cta-item');
          gsap.fromTo(
            items,
            { opacity: 0, y: 50, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.5)' }
          );
        },
        once: true,
      });

      // Morphing orb
      gsap.to(orbRef.current, {
        scale: 1.1,
        rotation: 5,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Create floating particles
      if (particlesRef.current) {
        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute rounded-full pointer-events-none';
          particle.style.width = `${Math.random() * 6 + 2}px`;
          particle.style.height = particle.style.width;
          particle.style.background = `rgba(59, 130, 246, ${Math.random() * 0.4 + 0.2})`;
          particle.style.boxShadow = `0 0 10px rgba(59, 130, 246, 0.5)`;
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          particlesRef.current.appendChild(particle);

          gsap.to(particle, {
            y: `${Math.random() * -200}px`,
            x: `${(Math.random() - 0.5) * 100}px`,
            opacity: 0,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            delay: Math.random() * 2,
            ease: 'power1.out',
            onRepeat: function () {
              gsap.set(particle, {
                y: 0,
                x: 0,
                opacity: 1,
                left: `${Math.random() * 100}%`,
                top: `100%`,
              });
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(6,182,212,0.15) 50%, rgba(167,139,250,0.1) 100%)',
            border: '1px solid rgba(59,130,246,0.3)',
          }}
        >
          {/* Background orb */}
          <div
            ref={orbRef}
            className="absolute morphing-blob"
            style={{
              width: 500,
              height: 500,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Particles container */}
          <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

          {/* Grid overlay */}
          <div className="absolute inset-0 grid-bg opacity-20" />

          {/* Content */}
          <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center py-20 px-6 lg:py-28">
            {/* Badge */}
            <div className="cta-item opacity-0 flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">Get Started Today</span>
            </div>

            {/* Headline */}
            <h2 className="cta-item opacity-0 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white mb-8 max-w-4xl leading-tight">
              Ready to transform how your{' '}
              <span className="gradient-text">business serves customers?</span>
            </h2>

            {/* CTA button with magnetic effect */}
            <div className="cta-item opacity-0">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #fff, #e0e7ff)',
                  color: '#1e40af',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.05, boxShadow: '0 0 50px rgba(59, 130, 246, 0.5)', duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)', duration: 0.3 });
                }}
              >
                <span className="z-10 flex items-center gap-2">
                  Request a Demo
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)' }}
                />
              </a>
            </div>

            {/* Trust indicators */}
            <div className="cta-item opacity-0 flex flex-wrap justify-center gap-6 mt-10 text-sm text-dark-300">
              {['No credit card', '14-day trial', 'Setup in minutes', 'Cancel anytime'].map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom animated line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(34,211,238,0.5), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
