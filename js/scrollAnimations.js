function scrollAnimations() {
    // Split text animations
    const splitTextElements = document.querySelectorAll('.split-text');
    
    splitTextElements.forEach(element => {
        // Split text into characters
        const text = element.textContent;
        element.textContent = '';
        
        // Create wrapper for characters
        const wrapper = document.createElement('div');
        wrapper.classList.add('split-text-wrapper');
        
        // Add each character in a span
        [...text].forEach(char => {
            const span = document.createElement('span');
            span.classList.add('split-char');
            span.textContent = char === ' ' ? '\u00A0' : char;
            wrapper.appendChild(span);
        });
        
        element.appendChild(wrapper);
        
        // Create animation for each element
        gsap.set(element.querySelectorAll('.split-char'), {
            y: 100,
            opacity: 0,
            rotateX: -90
        });
        
        ScrollTrigger.create({
            trigger: element,
            start: "top 80%",
            onEnter: () => {
                gsap.to(element.querySelectorAll('.split-char'), {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    stagger: 0.03,
                    duration: 1,
                    ease: "power3.out"
                });
            },
            once: true
        });
    });
    
    // Masked reveal animations
    const revealElements = document.querySelectorAll('.reveal-element');
    
    revealElements.forEach(element => {
        // Create mask overlay
        const mask = document.createElement('div');
        mask.classList.add('reveal-mask');
        
        // Clone the element
        const clone = element.cloneNode(true);
        clone.classList.add('reveal-clone');
        
        // Set up the structure
        element.classList.add('reveal-original');
        element.parentNode.insertBefore(mask, element);
        mask.appendChild(clone);
        
        // Create the animation
        gsap.set(mask, {
            width: 0,
            height: "100%"
        });
        
        ScrollTrigger.create({
            trigger: element.parentNode,
            start: "top 70%",
            onEnter: () => {
                gsap.to(mask, {
                    width: "100%",
                    duration: 1,
                    ease: "power3.inOut",
                    onComplete: () => {
                        // Clean up after animation
                        element.style.opacity = 1;
                        mask.remove();
                    }
                });
            },
            once: true
        });
    });
    
    // Parallax depth effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroLayers = heroSection.querySelectorAll('.parallax-layer');
        
        heroLayers.forEach((layer, index) => {
            const depth = layer.getAttribute('data-depth') || (index + 1) * 0.1;
            
            gsap.to(layer, {
                y: `${depth * 100}%`,
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }
    
    // Background theme shifts based on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (section.hasAttribute('data-bg-color')) {
            const bgColor = section.getAttribute('data-bg-color');
            const textColor = section.getAttribute('data-text-color') || '#ffffff';
            
            ScrollTrigger.create({
                trigger: section,
                start: "top 50%",
                end: "bottom 50%",
                onEnter: () => {
                    gsap.to('body', {
                        backgroundColor: bgColor,
                        color: textColor,
                        duration: 0.8,
                        ease: "power2.inOut"
                    });
                },
                onEnterBack: () => {
                    gsap.to('body', {
                        backgroundColor: bgColor,
                        color: textColor,
                        duration: 0.8,
                        ease: "power2.inOut"
                    });
                }
            });
        }
    });
    
    // Scroll-triggered gradient for footer
    const footer = document.querySelector('footer');
    if (footer) {
        ScrollTrigger.create({
            trigger: footer,
            start: "top 80%",
            onEnter: () => {
                gsap.to('body', {
                    backgroundImage: 'linear-gradient(to bottom, var(--bg-color), var(--footer-gradient-color))',
                    duration: 1.5,
                    ease: "power2.inOut"
                });
            },
            onLeaveBack: () => {
                gsap.to('body', {
                    backgroundImage: 'none',
                    duration: 1.5,
                    ease: "power2.inOut"
                });
            }
        });
    }
    
    // 3D tilt effect for cards and images
    const tiltElements = document.querySelectorAll('.tilt-element');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width - 0.5;
            const yPercent = y / rect.height - 0.5;
            
            const intensity = element.getAttribute('data-tilt-intensity') || 15;
            
            gsap.to(element, {
                rotationY: xPercent * intensity,
                rotationX: -yPercent * intensity,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "power2.out"
            });
            
            // Add subtle movement to inner elements
            const innerElements = element.querySelectorAll('.tilt-inner');
            innerElements.forEach((inner, index) => {
                const depth = inner.getAttribute('data-depth') || (index + 1) * 0.05;
                
                gsap.to(inner, {
                    x: xPercent * 50 * depth,
                    y: yPercent * 50 * depth,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
            
            // Reset inner elements
            const innerElements = element.querySelectorAll('.tilt-inner');
            innerElements.forEach(inner => {
                gsap.to(inner, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    });
}

export default scrollAnimations;