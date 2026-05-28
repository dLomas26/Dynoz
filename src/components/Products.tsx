import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hotel, LayoutDashboard, Plane, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const segments = [
  {
    icon: Hotel,
    title: 'Hotels & Stays',
    description: 'Automates front desk calls, concierge requests, and in-stay interactions with real-time PMS integration to execute, not just respond.',
    features: ['PMS Integration', '24/7 Support', 'Concierge AI'],
    color: '#3b82f6',
  },
  {
    icon: LayoutDashboard,
    title: 'Travel Platforms',
    description: 'Embed Dynoz as a native AI agent in your platform, powering voice and chat across support, bookings, and service workflows.',
    features: ['Native Embedding', 'Voice & Chat', 'API Access'],
    color: '#22d3ee',
  },
  {
    icon: Plane,
    title: 'Airlines',
    description: 'Delivers always-on voice and chat support across traveler interactions, from status queries and rebooking to FAQs, in the traveler\'s language.',
    features: ['Rebooking AI', 'Status Alerts', '50+ Languages'],
    color: '#a78bfa',
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
        const cards = gridRef.current.querySelectorAll('.segment-card');
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 80, scale: 0.9, rotateY: -5 },
              { opacity: 1, y: 0, scale: 1, rotateY: 0, duration: 1, stagger: 0.2, ease: 'power4.out' }
            );
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="segments" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 800,
            height: 400,
            background: 'radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headRef} className="text-center mb-16 opacity-0">
          <span className="section-tag mb-4">Who we serve</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mt-4">
            Built for Every Segment in{' '}
            <span className="gradient-text">Hospitality & Travel</span>
          </h2>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid md:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {segments.map(({ icon: Icon, title, description, features, color }, index) => (
            <div
              key={title}
              className="segment-card glass-card rounded-2xl overflow-hidden opacity-0 group relative"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -10,
                  rotateX: 5,
                  rotateY: -5,
                  scale: 1.02,
                  duration: 0.4,
                  ease: 'power2.out',
                });
                gsap.to(e.currentTarget.querySelector('.card-glow'), {
                  opacity: 1,
                  duration: 0.4,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  rotateX: 0,
                  rotateY: 0,
                  scale: 1,
                  duration: 0.4,
                  ease: 'power2.out',
                });
                gsap.to(e.currentTarget.querySelector('.card-glow'), {
                  opacity: 0,
                  duration: 0.4,
                });
              }}
            >
              {/* Card glow */}
              <div className="card-glow absolute inset-0 opacity-0 transition-opacity" style={{ background: `linear-gradient(135deg, ${color}15 0%, transparent 50%)` }} />

              {/* Top color bar */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, transparent 80%)` }} />

              <div className="p-8 relative z-10">
                <div className="feature-icon-wrapper mb-6" style={{ background: `${color}20`, borderColor: `${color}40` }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-3">{title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed mb-6">{description}</p>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {features.map((f) => (
                    <span key={f} className="px-2.5 py-1 rounded-lg text-xs font-medium text-dark-300 border border-white/[0.08] bg-white/[0.03]">
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="flex items-center gap-2 text-sm font-medium transition-colors group/link"
                  style={{ color }}
                >
                  Learn more
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
