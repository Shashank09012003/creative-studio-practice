// Utility functions for performance optimization

// Debounce function to limit how often a function can run
function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

// Throttle function to limit the rate at which a function can fire
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.bottom >= 0 - offset &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) + offset &&
        rect.right >= 0 - offset
    );
}

// Lazy load images
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        const lazyLoad = () => {
            lazyImages.forEach(img => {
                if (isInViewport(img, 300)) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
            
            if (lazyImages.length === 0) {
                document.removeEventListener('scroll', lazyLoadThrottled);
                window.removeEventListener('resize', lazyLoadThrottled);
                window.removeEventListener('orientationchange', lazyLoadThrottled);
            }
        };
        
        const lazyLoadThrottled = throttle(lazyLoad, 200);
        
        document.addEventListener('scroll', lazyLoadThrottled);
        window.addEventListener('resize', lazyLoadThrottled);
        window.addEventListener('orientationchange', lazyLoadThrottled);
        lazyLoad();
    }
}

// Preload critical resources
function preloadCriticalResources() {
    const resources = [
        // Add critical resources here
        // Example: '/images/hero-bg.jpg'
    ];
    
    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.js') ? 'script' : 
                 resource.endsWith('.css') ? 'style' : 
                 resource.match(/\.(jpe?g|png|gif|svg|webp)$/i) ? 'image' : 
                 'fetch';
        document.head.appendChild(link);
    });
}

export {
    debounce,
    throttle,
    isInViewport,
    lazyLoadImages,
    preloadCriticalResources
};