function footerNavAnimation() {
    // Enhanced footer text cycling with glitch effect
    const footerTexts = document.querySelectorAll('.footer-text');
    
    footerTexts.forEach(text => {
        // Initialize textillate with glitch effect
        $(text).textillate({
            in: {
                effect: 'fadeInUp',
                delayScale: 0.5,
                delay: 50,
                sync: false,
                shuffle: false
            },
            out: {
                effect: 'fadeOutDown',
                delayScale: 0.5,
                delay: 50,
                sync: false,
                shuffle: false
            },
            loop: true,
            type: 'char'
        });
        
        // Add glitch effect on hover
        text.addEventListener('mouseenter', () => {
            text.classList.add('glitch-effect');
            
            // Create glitch animation
            const glitchTimeline = gsap.timeline({repeat: 3, repeatDelay: 0.1});
            
            glitchTimeline.to(text, {
                skewX: 20,
                duration: 0.1,
                ease: "power1.inOut"
            })
            .to(text, {
                skewX: 0,
                duration: 0.1,
                ease: "power1.inOut"
            })
            .to(text, {
                opacity: 0.8,
                duration: 0.1,
                ease: "power1.inOut"
            })
            .to(text, {
                opacity: 1,
                duration: 0.1,
                ease: "power1.inOut"
            });
        });
        
        text.addEventListener('mouseleave', () => {
            text.classList.remove('glitch-effect');
        });
    });
    
    // Nav hover: underline stretch + magnetic pull
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        // Add magnetic class for cursor interaction
        link.classList.add('magnetic');
        
        // Create underline element
        const underline = document.createElement('span');
        underline.classList.add('nav-underline');
        link.appendChild(underline);
        
        // Underline animation
        link.addEventListener('mouseenter', () => {
            gsap.fromTo(underline, 
                {width: '0%', left: '50%', right: '50%'},
                {width: '100%', left: '0%', right: '0%', duration: 0.4, ease: "power2.out"}
            );
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.fromTo(underline, 
                {width: '100%', left: '0%', right: '0%'},
                {width: '0%', left: '50%', right: '50%', duration: 0.4, ease: "power2.in"}
            );
        });
    });
    
    // Mobile menu toggle with animation
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            
            if (menuToggle.classList.contains('active')) {
                // Open menu
                gsap.to(mobileNav, {
                    y: '0%',
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out"
                });
                
                // Animate menu items
                const menuItems = mobileNav.querySelectorAll('li');
                gsap.fromTo(menuItems, 
                    {y: 30, opacity: 0},
                    {y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out", delay: 0.2}
                );
            } else {
                // Close menu
                gsap.to(mobileNav, {
                    y: '-100%',
                    opacity: 0,
                    duration: 0.5,
                    ease: "power3.in"
                });
            }
        });
    }
    
    // Footer reveal animation
    const footer = document.querySelector('footer');
    
    if (footer) {
        ScrollTrigger.create({
            trigger: footer,
            start: "top 90%",
            onEnter: () => {
                gsap.fromTo(footer, 
                    {y: 100, opacity: 0},
                    {y: 0, opacity: 1, duration: 1, ease: "power3.out"}
                );
                
                // Animate footer elements
                const footerElements = footer.querySelectorAll('.footer-animate');
                gsap.fromTo(footerElements, 
                    {y: 50, opacity: 0},
                    {y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out", delay: 0.3}
                );
            },
            once: true
        });
    }
}

export default footerNavAnimation;