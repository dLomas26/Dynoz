import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Orbs with scale and fade
      tl.fromTo(
        [orb1Ref.current, orb2Ref.current],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out' },
        0
      );

      // Headline with dramatic reveal
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.headline-line');
        tl.fromTo(
          lines,
          { opacity: 0, y: 80, rotateX: -15 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out' },
          0.4
        );
      }

      // Visual panel
      tl.fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.8, rotateY: -10 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: 'power3.out' },
        0.6
      );

      // Subtext
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        1.0
      );

      // CTAs with bounce
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.7)' },
          1.2
        );
      }

      // Continuous floating orb animations
      gsap.to(orb1Ref.current, {
        x: 50,
        y: -40,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(orb2Ref.current, {
        x: -40,
        y: 50,
        duration: 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      // Morphing animation for visual
      gsap.to(visualRef.current, {
        scale: 1.02,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Animating orbs */}
      <div
        ref={orb1Ref}
        className="absolute opacity-0"
        style={{
          width: 600,
          height: 600,
          top: '5%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute opacity-0"
        style={{
          width: 500,
          height: 500,
          top: '30%',
          right: '-15%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col">
            {/* Headline */}
            <div ref={headlineRef} className="flex flex-col">
              <div className="overflow-hidden">
                <div className="headline-line text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.05] tracking-tight opacity-0">
                  Where Service
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="headline-line text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.05] tracking-tight opacity-0">
                  <span ref={wordsRef} className="gradient-text">Meets Intelligence.</span>
                </div>
              </div>
            </div>

            {/* Subtext */}
            <p ref={subRef} className="text-lg sm:text-xl text-dark-300 leading-relaxed max-w-xl mt-6 opacity-0">
              Dynoz is an AI operations layer built for hospitality and travel.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 mt-10">
              <a href="#contact" className="btn-primary text-base px-7 py-3.5 opacity-0">
                Request a Demo
                <ArrowRight size={18} />
              </a>
              <a href="#about" className="btn-secondary text-base px-7 py-3.5 opacity-0">
                Learn More
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div ref={visualRef} className="relative opacity-0" style={{ perspective: '1000px' }}>
              {/* Main AI visual card */}
              <div className="glass-card rounded-2xl p-6 relative overflow-hidden" style={{ width: '400px', maxWidth: '100%' }}>
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)', animation: 'shimmer 3s linear infinite' }} />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center pulse-glow" style={{ background: 'linear-gradient(135deg, #3b82f6, #22d3ee)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <line x1="12" x2="12" y1="19" y2="22"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white">Dynoz AI Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" style={{ boxShadow: '0 0 8px #10b981' }} />
                    <span className="text-xs text-emerald-400 font-medium">Live</span>
                  </div>
                </div>

                {/* Waveform visualization */}
                <div className="relative h-32 mb-4 flex items-end justify-center gap-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full"
                      style={{
                        height: `${Math.random() * 60 + 20}%`,
                        animation: `wave 1s ease-in-out infinite`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 relative z-10">
                  {[
                    { label: 'Response', value: '0.8s' },
                    { label: 'Accuracy', value: '98.5%' },
                    { label: 'Languages', value: '50+' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06] text-center">
                      <div className="text-white font-display font-bold text-base">{value}</div>
                      <div className="text-dark-400 text-xs mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-2 float" style={{ animationDelay: '0s' }}>
                <span className="text-xs font-medium text-cyan-400">24/7 Support</span>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-2 float" style={{ animationDelay: '1s' }}>
                <span className="text-xs font-medium text-blue-400">Multilingual</span>
              </div>

              <style>{`
                @keyframes wave {
                  0%, 100% { transform: scaleY(1); }
                  50% { transform: scaleY(0.5); }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-dark-400 tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-dark-400 relative overflow-hidden">
          <div className="w-1.5 h-3 bg-dark-400 rounded-full absolute left-1/2 -translate-x-1/2 top-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
