import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LogoBar() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative py-8 opacity-0">
      <div className="text-center">
        <p className="text-xs text-dark-500 tracking-widest uppercase">
          Powering customer interactions across hospitality and travel
        </p>
      </div>
    </div>
  );
}
