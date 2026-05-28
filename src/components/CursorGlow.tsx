import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ParticleData {
  element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const particles = useRef<ParticleData[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Create floating particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2})`;
      particle.style.boxShadow = `0 0 ${size * 2}px rgba(59, 130, 246, 0.5)`;

      container.appendChild(particle);

      const data: ParticleData = {
        element: particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size,
        opacity: Math.random() * 0.5 + 0.3,
      };
      particles.current.push(data);
    }

    const animate = () => {
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;

        p.element.style.transform = `translate(${p.x}px, ${p.y}px)`;
        p.element.style.opacity = String(p.opacity);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.innerHTML = '';
      particles.current = [];
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow hidden lg:block" />
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
    </>
  );
}
