import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneCall, ConciergeBell, Languages } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: PhoneCall,
    title: 'Reservations & Support Calls',
    description: 'Handles inbound and outbound reservation calls, inquiries, and follow-ups across every hospitality and travel segment.',
    color: '#3b82f6',
    stats: { value: '24/7', label: 'Availability' },
  },
  {
    icon: ConciergeBell,
    title: 'Operations & Order Management',
    description: 'Handles operational requests, orders, and service workflows in real time, integrated directly with the systems your business runs on.',
    color: '#22d3ee',
    stats: { value: '<1s', label: 'Response Time' },
  },
  {
    icon: Languages,
    title: 'Multilingual Support Lines',
    description: 'Delivers voice and chat support across languages, built for the diversity of a global customer base.',
    color: '#a78bfa',
    stats: { value: '50+', label: 'Languages' },
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(headRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        },
        once: true,
      });

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.feature-card');
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 60, rotateX: -10, scale: 0.95 },
              { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
            );
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    setHoveredIndex(null);
  };

  return (
    <section ref={sectionRef} id="features" className="relative py-24 lg:py-32">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headRef} className="text-center mb-16 opacity-0">
          <span className="section-tag mb-4">What Dynoz does</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mt-4">
            Every Customer. Instantly Assisted.
          </h2>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid md:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {features.map(({ icon: Icon, title, description, color, stats }, index) => (
            <div
              key={title}
              className="feature-card glass-card rounded-2xl p-8 opacity-0 cursor-pointer relative overflow-hidden animated-border"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Animated background on hover */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${color}15 0%, transparent 70%)`,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />

              {/* Floating particles inside card */}
              {hoveredIndex === index && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        background: color,
                        boxShadow: `0 0 6px ${color}`,
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 3) * 20}%`,
                        animation: `float-particle 2s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="relative z-10">
                <div className="feature-icon-wrapper mb-6" style={{ background: `${color}20`, borderColor: `${color}40` }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-3">{title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed mb-6">{description}</p>

                {/* Stats badge */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <span className="font-display font-bold text-2xl" style={{ color }}>{stats.value}</span>
                  <span className="text-dark-400 text-xs">{stats.label}</span>
                </div>
              </div>

              <style>{`
                @keyframes float-particle {
                  0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
                  50% { transform: translateY(-10px) scale(1.5); opacity: 1; }
                }
              `}</style>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
