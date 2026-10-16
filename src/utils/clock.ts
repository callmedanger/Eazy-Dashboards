import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

type ClockSubscriber = (time: number, deltaTime: number) => void;

class ClockEngine {
  private lenisInstance: Lenis | null = null;
  private subscribers: Set<ClockSubscriber> = new Set();
  private isInitialized = false;

  public init(): Lenis {
    if (this.isInitialized && this.lenisInstance) {
      return this.lenisInstance;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Instantiate Lenis without internal autoRaf (we drive it via ONE CLOCK)
    this.lenisInstance = new Lenis({
      autoRaf: false,
      lerp: prefersReducedMotion ? 1 : 0.09,
      duration: prefersReducedMotion ? 0.01 : 1.1,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    this.lenisInstance.on('scroll', ScrollTrigger.update);

    // ONE CLOCK: Connect everything to gsap.ticker
    gsap.ticker.add((time: number, deltaTime: number) => {
      if (this.lenisInstance) {
        this.lenisInstance.raf(time * 1000);
      }

      // Notify all clock subscribers (cursor, pointer tracking, spring effects)
      for (const subscriber of this.subscribers) {
        subscriber(time, deltaTime);
      }
    });

    // Disable GSAP lag smoothing to maintain lock-step synchronization between scroll and motion
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger when window dimensions or layout changes
    window.addEventListener('resize', this.handleResize);

    this.isInitialized = true;
    return this.lenisInstance;
  }

  private handleResize = () => {
    ScrollTrigger.refresh();
  };

  public getLenis(): Lenis | null {
    return this.lenisInstance;
  }

  public subscribe(callback: ClockSubscriber): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  public scrollTo(target: string | HTMLElement | number, options?: { offset?: number; immediate?: boolean }) {
    if (this.lenisInstance) {
      this.lenisInstance.scrollTo(target, options);
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  public destroy() {
    window.removeEventListener('resize', this.handleResize);
    this.subscribers.clear();
    if (this.lenisInstance) {
      this.lenisInstance.destroy();
      this.lenisInstance = null;
    }
    this.isInitialized = false;
  }
}

export const clock = new ClockEngine();
export { gsap, ScrollTrigger };
