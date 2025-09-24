import loadingAnimation from './loadingAnimation.js';
import cursorAnimation from './cursor.js';
import locomotiveAnimation from './locomotiveAnimation.js';
import scrollAnimations from './scrollAnimations.js';
import sheryAnimation from './sheryAnimation.js';
import flagAnimation from './flagAnimation.js';
import footerNavAnimation from './footerNav.js';
import mediaInteractions from './mediaInteractions.js';
import { lazyLoadImages, preloadCriticalResources } from './utils.js';

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical resources
    preloadCriticalResources();
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // Start with loading animation
    loadingAnimation().then(() => {
        // Initialize all other animations after loading completes
        cursorAnimation();
        
        // Initialize Locomotive Scroll
        const locoScroll = locomotiveAnimation();
        
        // Initialize ScrollTrigger animations (after Locomotive is ready)
        scrollAnimations();
        
        // Initialize Shery.js animations
        sheryAnimation();
        
        // Initialize flag animation
        flagAnimation();
        
        // Initialize footer and nav animations
        footerNavAnimation();
        
        // Initialize media interactions
        mediaInteractions();
        
        // Handle navigation scroll effect
        const nav = document.querySelector('nav');
        if (nav) {
            locoScroll.on('scroll', (args) => {
                if (args.scroll.y > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });
        }
        
        // Global micro-animations for elements with .animate-in class
        const animateElements = document.querySelectorAll('.animate-in');
        
        animateElements.forEach(element => {
            const animationType = element.getAttribute('data-animation') || 'fade';
            const delay = element.getAttribute('data-delay') || 0;
            let animation;
            
            switch (animationType) {
                case 'fade':
                    animation = {
                        opacity: 0,
                        y: 30,
                        duration: 0.8,
                        delay: parseFloat(delay),
                        ease: "power3.out"
                    };
                    break;
                case 'slide':
                    animation = {
                        opacity: 0,
                        x: -50,
                        duration: 0.8,
                        delay: parseFloat(delay),
                        ease: "power3.out"
                    };
                    break;
                case 'scale':
                    animation = {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.8,
                        delay: parseFloat(delay),
                        ease: "back.out(1.7)"
                    };
                    break;
                case 'rotate':
                    animation = {
                        opacity: 0,
                        rotation: -5,
                        y: 30,
                        duration: 0.8,
                        delay: parseFloat(delay),
                        ease: "power3.out"
                    };
                    break;
                default:
                    animation = {
                        opacity: 0,
                        y: 30,
                        duration: 0.8,
                        delay: parseFloat(delay),
                        ease: "power3.out"
                    };
            }
            
            // Set initial state
            gsap.set(element, {
                opacity: 0,
                ...(animation.y !== undefined && { y: animation.y }),
                ...(animation.x !== undefined && { x: animation.x }),
                ...(animation.scale !== undefined && { scale: animation.scale }),
                ...(animation.rotation !== undefined && { rotation: animation.rotation })
            });
            
            // Create scroll trigger
            ScrollTrigger.create({
                trigger: element,
                start: "top 85%",
                onEnter: () => {
                    gsap.to(element, {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        scale: 1,
                        rotation: 0,
                        duration: animation.duration,
                        delay: animation.delay,
                        ease: animation.ease
                    });
                },
                once: true
            });
        });
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Refresh ScrollTrigger and Locomotive on resize
    ScrollTrigger.refresh();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Resume animations when page becomes visible
        gsap.resumeAll();
    } else {
        // Pause animations when page is hidden
        gsap.pauseAll();
    }
});