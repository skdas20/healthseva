import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// GSAP Timeline utilities for complex animations
export class GSAPAnimations {
  // Hero section entrance animation
  static heroEntrance(container: string | Element) {
    const tl = gsap.timeline();
    
    // Get the container element
    const containerEl = typeof container === 'string' ? document.querySelector(container) : container;
    if (!containerEl) return tl;
    
    tl.fromTo(
      containerEl.querySelector('.hero-title'),
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      }
    )
    .fromTo(
      containerEl.querySelector('.hero-subtitle'),
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.6'
    )
    .fromTo(
      containerEl.querySelector('.hero-buttons'),
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.4'
    );

    return tl;
  }

  // Card animation with stagger
  static cardStagger(selector: string, delay = 0) {
    return gsap.fromTo(
      selector,
      {
        opacity: 0,
        y: 80,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        delay,
        scrollTrigger: {
          trigger: selector,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // Parallax scrolling effect
  static parallaxElement(selector: string, speed = -0.5) {
    return gsap.to(selector, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: selector,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Text reveal animation
  static textReveal(selector: string, options = {}) {
    const defaultOptions = {
      duration: 1,
      ease: 'power3.out',
      delay: 0,
      ...options,
    };

    return gsap.fromTo(
      selector,
      {
        opacity: 0,
        y: 50,
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
      },
      {
        opacity: 1,
        y: 0,
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
        ...defaultOptions,
        scrollTrigger: {
          trigger: selector,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // Counter animation
  static animateCounter(selector: string, endValue: number, duration = 2) {
    const element = document.querySelector(selector);
    if (!element) return;

    return gsap.to(element, {
      textContent: endValue,
      duration,
      ease: 'power2.out',
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  // Morphing background animation
  static morphingBackground(selector: string) {
    return gsap.to(selector, {
      backgroundPosition: '200% 50%',
      duration: 8,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });
  }

  // Page transition
  static pageTransition() {
    const tl = gsap.timeline();

    // Exit animation
    tl.to('.page-transition', {
      scaleY: 1,
      transformOrigin: 'bottom',
      duration: 0.5,
      ease: 'power2.inOut',
    });

    // Enter animation
    tl.to('.page-transition', {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.5,
      ease: 'power2.inOut',
    });

    return tl;
  }

  // Floating elements animation
  static floatingElements(selector: string) {
    return gsap.to(selector, {
      y: -20,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.3,
        from: 'random',
      },
    });
  }

  // Navbar animation on scroll
  static navbarOnScroll(selector: string) {
    return ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      toggleClass: {
        className: 'navbar-scrolled',
        targets: selector,
      },
    });
  }

  // Image reveal with mask
  static imageReveal(selector: string) {
    return gsap.fromTo(
      selector,
      {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
      },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: selector,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // Button hover effects
  static buttonHover(selector: string) {
    const buttons = document.querySelectorAll(selector);
    
    buttons.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }

  // Loading animation
  static loadingAnimation(selector: string) {
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(`${selector} .dot-1`, {
      y: -20,
      duration: 0.5,
      ease: 'power2.out',
    })
    .to(`${selector} .dot-1`, {
      y: 0,
      duration: 0.5,
      ease: 'power2.in',
    })
    .to(`${selector} .dot-2`, {
      y: -20,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.7')
    .to(`${selector} .dot-2`, {
      y: 0,
      duration: 0.5,
      ease: 'power2.in',
    })
    .to(`${selector} .dot-3`, {
      y: -20,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.7')
    .to(`${selector} .dot-3`, {
      y: 0,
      duration: 0.5,
      ease: 'power2.in',
    });

    return tl;
  }

  // 3D card rotation for services carousel
  static carouselRotation(cards: HTMLElement[], currentIndex: number) {
    const totalCards = cards.length;
    const angleStep = 360 / totalCards;
    
    cards.forEach((card, index) => {
      const angle = (index - currentIndex) * angleStep;
      const isActive = index === currentIndex;
      
      gsap.to(card, {
        rotationY: angle,
        z: isActive ? 100 : 0,
        scale: isActive ? 1.1 : 0.9,
        opacity: isActive ? 1 : 0.7,
        duration: 0.8,
        ease: 'power2.inOut'
      });
    });
  }

  // Flip card animation for benefits section
  static flipCard(card: HTMLElement, isFlipped: boolean) {
    const front = card.querySelector('.card-front') as HTMLElement;
    const back = card.querySelector('.card-back') as HTMLElement;
    
    if (front && back) {
      gsap.to(front, {
        rotationY: isFlipped ? -180 : 0,
        duration: 0.6,
        ease: 'power2.inOut'
      });
      
      gsap.to(back, {
        rotationY: isFlipped ? 0 : 180,
        duration: 0.6,
        ease: 'power2.inOut'
      });
    }
  }

  // Isometric card animations for problems section
  static isometricCard(element: HTMLElement, isHovered: boolean) {
    gsap.to(element, {
      rotationX: isHovered ? -10 : 0,
      rotationY: isHovered ? 5 : 0,
      z: isHovered ? 50 : 0,
      scale: isHovered ? 1.05 : 1,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  }

  // Service icon continuous rotation
  static rotateIcon(element: HTMLElement, speed: number = 1) {
    gsap.to(element, {
      rotation: 360,
      duration: 10 / speed,
      ease: 'none',
      repeat: -1
    });
  }

  // Floating checkmark animations
  static floatingCheckmarks(container: HTMLElement) {
    const checkmarks = container.querySelectorAll('.floating-checkmark');
    
    checkmarks.forEach((checkmark, index) => {
      gsap.set(checkmark, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50
      });
      
      gsap.to(checkmark, {
        y: '-=30',
        opacity: 0,
        duration: 2 + Math.random() * 2,
        ease: 'power1.out',
        repeat: -1,
        delay: index * 0.5
      });
    });
  }

  // Progress indicator animation
  static progressIndicator(element: HTMLElement, progress: number) {
    gsap.to(element, {
      scaleX: progress / 100,
      duration: 0.3,
      ease: 'power2.out',
      transformOrigin: 'left center'
    });
  }

  // Medical equipment silhouettes floating
  static floatingMedicalEquipment(selector: string) {
    gsap.to(selector, {
      y: '-=15',
      x: '+=10',
      rotation: '+=5',
      duration: 3 + Math.random() * 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.8,
        from: 'random'
      }
    });
  }

  // 3D hover effect with tilt
  static hover3DTilt(element: HTMLElement) {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      gsap.to(element, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        z: 20,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        rotationX: 0,
        rotationY: 0,
        z: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  }

  // Color transition animation for problem icons
  static colorTransition(element: HTMLElement, colors: string[]) {
    const tl = gsap.timeline({ repeat: -1 });
    
    colors.forEach((color, index) => {
      tl.to(element, {
        color: color,
        duration: 2,
        ease: 'power2.inOut'
      });
    });
    
    return tl;
  }

  // Cleanup function to kill all ScrollTriggers
  static cleanup() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf('*');
  }
}

// Utility functions for common GSAP operations
export const gsapUtils = {
  // Set default ease
  setDefaults: () => {
    gsap.defaults({
      ease: 'power2.out',
      duration: 0.6,
    });
  },

  // Refresh ScrollTrigger (useful after DOM changes)
  refresh: () => {
    ScrollTrigger.refresh();
  },

  // Create a simple fade in animation
  fadeIn: (selector: string, delay = 0) => {
    return gsap.fromTo(
      selector,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay }
    );
  },

  // Create a simple slide up animation
  slideUp: (selector: string, delay = 0) => {
    return gsap.fromTo(
      selector,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power3.out' }
    );
  },
};
