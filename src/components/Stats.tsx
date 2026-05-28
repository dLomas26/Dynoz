import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, TrendingUp, Shield, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const uspItems = [
  {
    icon: Zap,
    title: 'Deep Integrations',
    description: 'Integrates directly with your existing software to execute tasks end to end, in real time.',
    features: ['PMS Systems', 'Booking Engines', 'CRM Platforms', 'Channel Managers'],
    color: '#3b82f6',
    stat: '200+',
    statLabel: 'Integrations',
  },
  {
    icon: TrendingUp,
    title: 'Operational Efficiency',
    description: 'Automates high-volume customer interactions at scale, without compromising service quality.',
    features: ['Instant Response', 'Queue Management', 'Peak Handling', 'Smart Routing'],
    color: '#22d3ee',
    stat: '80%',
    statLabel: 'Cost Reduction',
  },
  {
    icon: Shield,
    title: 'Enterprise-Ready',
    description: 'Secure, compliant infrastructure engineered for multi-property global deployment.',
    features: ['SOC 2', 'GDPR Ready', 'Data Encryption', '99.9% Uptime'],
    color: '#10b981',
    stat: '<1s',
    statLabel: 'Avg Response',
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

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

      if (itemsRef.current) {
        const itemEls = itemsRef.current.querySelectorAll('.usp-item');
        ScrollTrigger.create({
          trigger: itemsRef.current,
          start: 'top 70%',
          onEnter: () => {
            itemEls.forEach((el, i) => {
              const isEven = i % 2 === 0;
              gsap.fromTo(
                el,
                { opacity: 0, x: isEven ? -80 : 80, rotateY: isEven ? -10 : 10 },
                { opacity: 1, x: 0, rotateY: 0, duration: 1, delay: i * 0.2, ease: 'power3.out' }
              );

              // Animate features staggered
              const features = el.querySelectorAll('.usp-feature');
              gsap.fromTo(
                features,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, delay: i * 0.2 + 0.5, ease: 'back.out(1.5)' }
              );

              // Animate stat counter
              const stat = el.querySelector('.stat-value');
              if (stat) {
                gsap.fromTo(
                  stat,
                  { textContent: '0' },
                  {
                    textContent: stat.textContent,
                    duration: 2,
                    delay: i * 0.2 + 0.3,
                    ease: 'power1.out',
                    snap: { textContent: 1 },
                    onUpdate: function () {
                      stat.textContent = this.targets()[0].textContent;
                    },
                  }
                );
              }
            });
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 lg:py-32">
      {/* Background orb */}
      <div
        className="absolute opacity-50 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          bottom: '10%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headRef} className="text-center mb-20 opacity-0">
          <span className="section-tag mb-4">Why choose Dynoz</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mt-4">
            Built for speed, scale, and consistency
          </h2>
        </div>

        {/* USP Items */}
        <div ref={itemsRef} className="flex flex-col gap-12" style={{ perspective: '1000px' }}>
          {uspItems.map(({ icon: Icon, title, description, features, color, stat, statLabel }, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={title}
                className="usp-item flex flex-col lg:flex-row items-center gap-8 lg:gap-16 opacity-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Visual side */}
                <div className={`w-full lg:w-1/2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="glass-card rounded-2xl p-8 lg:p-10 relative overflow-hidden group" style={{ perspective: '1000px' }}>
                    {/* Top color gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, ${color}10 0%, transparent 70%)` }} />

                    <div className="relative z-10">
                      {/* Stat display */}
                      <div className="flex items-start justify-between mb-8">
                        <div className="feature-icon-wrapper" style={{ background: `${color}20`, borderColor: `${color}40` }}>
                          <Icon size={24} style={{ color }} />
                        </div>
                        <div className="text-right">
                          <div className="stat-value font-display font-bold text-4xl lg:text-5xl" style={{ color }}>{stat}</div>
                          <div className="text-dark-400 text-sm mt-1">{statLabel}</div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-2xl lg:text-3xl text-white mb-4">{title}</h3>
                      <p className="text-dark-300 text-base lg:text-lg leading-relaxed mb-8">{description}</p>

                      {/* Features grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {features.map((f) => (
                          <div key={f} className="usp-feature flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                            <Check size={14} style={{ color }} />
                            <span className="text-sm text-dark-200">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty spacer for layout */}
                <div className={`hidden lg:block w-1/2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
