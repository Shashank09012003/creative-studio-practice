function loadingAnimation() {
    return new Promise((resolve) => {
        const loader = document.querySelector('.loader');
        const counter = document.querySelector('.loader-counter');
        const progressFill = document.querySelector('.loader-progress-fill');
        
        if (!loader || !counter || !progressFill) {
            resolve();
            return;
        }
        
        // Preload images
        const images = document.querySelectorAll('img');
        let imagesLoaded = 0;
        const totalImages = images.length;
        
        // Counter animation
        let count = 0;
        const counterInterval = setInterval(() => {
            // Calculate target percentage based on actual loaded images
            const targetPercent = Math.min(Math.floor((imagesLoaded / totalImages) * 100), 100) || Math.min(count + 1, 100);
            
            // Increment counter
            if (count < targetPercent) {
                count++;
                counter.textContent = count;
                progressFill.style.width = `${count}%`;
            }
            
            // Complete loading when counter reaches 100
            if (count >= 100) {
                clearInterval(counterInterval);
                
                // Animate loader out
                gsap.to(counter, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    ease: "power2.in"
                });
                
                gsap.to(progressFill.parentNode, {
                    opacity: 0,
                    duration: 0.5,
                    delay: 0.2,
                    ease: "power2.in"
                });
                
                gsap.to(loader, {
                    y: "-100%",
                    duration: 0.8,
                    delay: 0.7,
                    ease: "power2.inOut",
                    onComplete: () => {
                        // Remove loader from DOM
                        loader.remove();
                        
                        // Animate content in
                        gsap.from("main > *", {
                            opacity: 0,
                            y: 30,
                            stagger: 0.1,
                            duration: 0.8,
                            ease: "power2.out"
                        });
                        
                        // Resolve promise to continue with other animations
                        resolve();
                    }
                });
            }
        }, 20);
        
        // Track image loading
        const trackImageLoading = () => {
            imagesLoaded++;
        };
        
        // Check if all images are already cached
        if (totalImages === 0) {
            // Force complete after a short delay if no images
            setTimeout(() => {
                count = 99; // Will trigger completion on next interval
            }, 1000);
        } else {
            // Track loading of each image
            images.forEach(img => {
                if (img.complete) {
                    trackImageLoading();
                } else {
                    img.addEventListener('load', trackImageLoading);
                    img.addEventListener('error', trackImageLoading); // Count errors as loaded
                }
            });
        }
        
        // Ensure loading completes even if images fail
        setTimeout(() => {
            count = 99; // Will trigger completion on next interval
        }, 5000);
    });
}

export default loadingAnimation;