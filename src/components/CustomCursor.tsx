import React, { useEffect, useRef, useState } from 'react';
import { clock } from '../utils/clock';

interface TrailPoint {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only fine pointers (mouse), strictly never on touch devices
    const media = window.matchMedia('(pointer: fine)');
    setIsFinePointer(media.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    media.addEventListener('change', handleMediaChange);

    return () => {
      media.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    let targetX = -100;
    let targetY = -100;
    let prevTargetX = -100;
    let prevTargetY = -100;

    // Direct cursor dot (fast responsiveness)
    let dotX = -100;
    let dotY = -100;

    // Follower ring (fluid drag & inertia)
    let ringX = -100;
    let ringY = -100;
    let ringRadius = 14;
    let targetRadius = 14;

    // States
    let isVisible = false;
    let isPressed = false;
    let isHoveringInteractive = false;
    let opacity = 0;

    // Ribbon trail history (smooth silk flow)
    const MAX_TRAIL = 22;
    const trail: TrailPoint[] = [];

    // Ambient micro-particles on fast swipes
    const particles: Particle[] = [];

    // Click shockwave ripples
    const ripples: Ripple[] = [];

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isVisible = true;

      // Initialize on first move
      if (dotX < 0) {
        dotX = targetX;
        dotY = targetY;
        ringX = targetX;
        ringY = targetY;
      }

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, select, textarea, [role="button"], .interactive, .btn-press, .card-press, .spotlight-card'
        );
        isHoveringInteractive = !!interactive;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isPressed = true;
      targetRadius = isHoveringInteractive ? 20 : 10;

      // Spawn click ripple
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: 36,
        alpha: 0.8,
      });
    };

    const onPointerUp = () => {
      isPressed = false;
      targetRadius = isHoveringInteractive ? 28 : 14;
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const onMouseEnter = () => {
      isVisible = true;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Single central clock subscription
    const unsubscribe = clock.subscribe((_time, deltaTime) => {
      const dt = Math.max(deltaTime, 0.016);

      // Smooth opacity fade
      if (isVisible) {
        opacity += (1 - opacity) * 0.15;
      } else {
        opacity += (0 - opacity) * 0.15;
      }

      ctx.clearRect(0, 0, width, height);

      if (opacity < 0.01 || targetX < 0 || targetY < 0) {
        return;
      }

      // Calculate instantaneous mouse velocity
      const vx = (targetX - prevTargetX) / dt;
      const vy = (targetY - prevTargetY) / dt;
      const speed = Math.hypot(vx, vy);

      prevTargetX = targetX;
      prevTargetY = targetY;

      // Lerp dot position (crisp low latency)
      dotX += (targetX - dotX) * 0.65;
      dotY += (targetY - dotY) * 0.65;

      // Lerp ring position (smooth elastic inertia)
      const ringLerp = isHoveringInteractive ? 0.22 : 0.15;
      ringX += (targetX - ringX) * ringLerp;
      ringY += (targetY - ringY) * ringLerp;

      // Adjust target radius based on hover / press state
      if (isPressed) {
        targetRadius = isHoveringInteractive ? 22 : 10;
      } else if (isHoveringInteractive) {
        targetRadius = 28;
      } else {
        targetRadius = 14;
      }
      ringRadius += (targetRadius - ringRadius) * 0.18;

      // Update trail points
      trail.unshift({ x: dotX, y: dotY });
      if (trail.length > MAX_TRAIL) {
        trail.pop();
      }

      // Spawn micro-particles on fast swipes (> 350 px/s)
      if (speed > 350 && particles.length < 24 && Math.random() > 0.4) {
        const spread = (Math.random() - 0.5) * 6;
        particles.push({
          x: dotX + spread,
          y: dotY + spread,
          vx: -vx * 0.04 + (Math.random() - 0.5) * 40,
          vy: -vy * 0.04 + (Math.random() - 0.5) * 40,
          size: Math.random() * 2 + 1,
          alpha: 0.7,
          life: 0,
          maxLife: 20 + Math.random() * 15,
        });
      }

      ctx.save();
      ctx.globalAlpha = opacity;

      // 1. RENDER EXPANDING RIPPLES (On click / press)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.14;
        r.alpha -= 0.035;

        if (r.alpha <= 0.01) {
          ripples.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(27, 166, 166, ${r.alpha * 0.7})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // 2. RENDER FLOWING SILK RIBBON TRAIL
      if (trail.length > 2) {
        // Outer soft glow pass
        for (let i = 0; i < trail.length - 1; i++) {
          const ptA = trail[i];
          const ptB = trail[i + 1];
          const progress = 1 - i / trail.length; // 1 at head, 0 at tail

          ctx.beginPath();
          ctx.moveTo(ptA.x, ptA.y);
          ctx.lineTo(ptB.x, ptB.y);

          // Glow width tapers down smoothly
          ctx.lineWidth = progress * 7 + 1;
          ctx.lineCap = 'round';
          ctx.strokeStyle = `rgba(27, 166, 166, ${progress * 0.25})`;
          ctx.stroke();
        }

        // Inner luminous core line pass
        for (let i = 0; i < trail.length - 1; i++) {
          const ptA = trail[i];
          const ptB = trail[i + 1];
          const progress = 1 - i / trail.length;

          ctx.beginPath();
          ctx.moveTo(ptA.x, ptA.y);
          ctx.lineTo(ptB.x, ptB.y);

          ctx.lineWidth = progress * 3.5 + 0.7;
          ctx.lineCap = 'round';
          // Gradient between luminous cyan and emerald teal
          ctx.strokeStyle = `rgba(64, 224, 208, ${progress * 0.75})`;
          ctx.stroke();
        }
      }

      // 3. RENDER MICRO PARTICLES
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx * 0.016;
        p.y += p.vy * 0.016;
        p.alpha = (1 - p.life / p.maxLife) * 0.7;

        if (p.life >= p.maxLife || p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37, 196, 196, ${p.alpha})`;
          ctx.fill();
        }
      }

      // 4. RENDER ELASTIC SQUASH-&-STRETCH FOLLOWER RING
      ctx.save();
      ctx.translate(ringX, ringY);

      // Calculate elongation angle and stretch factor from ring-to-mouse displacement
      const dx = targetX - ringX;
      const dy = targetY - ringY;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const stretch = Math.min(dist / 140, 0.45); // subtle organic droplet stretch

      ctx.rotate(angle);
      ctx.scale(1 + stretch, 1 / (1 + stretch * 0.6));

      // Ambient radial inner glow
      const glowGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, ringRadius);
      glowGrad.addColorStop(0, isHoveringInteractive ? 'rgba(27, 166, 166, 0.18)' : 'rgba(27, 166, 166, 0.08)');
      glowGrad.addColorStop(1, 'rgba(27, 166, 166, 0.01)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring border
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isHoveringInteractive
        ? 'rgba(27, 166, 166, 0.85)'
        : 'rgba(27, 166, 166, 0.4)';
      ctx.lineWidth = isHoveringInteractive ? 1.75 : 1.25;
      ctx.stroke();

      ctx.restore();

      // 5. RENDER CORE PRECISION POINTER DOT
      ctx.save();
      ctx.translate(dotX, dotY);

      // Core dot glow halo
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(27, 166, 166, 0.35)';
      ctx.fill();

      // Center crisp dot
      ctx.beginPath();
      ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = isHoveringInteractive ? '#25C4C4' : '#0B2A5B';
      ctx.fill();

      // Highlight pinpoint
      ctx.beginPath();
      ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();

      ctx.restore();
    });

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      aria-hidden="true"
    />
  );
};

export default CustomCursor;
