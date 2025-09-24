function locomotiveAnimation() {
    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1,
        smartphone: {
            smooth: true,
            multiplier: 1
        },
        tablet: {
            smooth: true,
            multiplier: 1
        }
    });
    
    // Update ScrollTrigger when locomotive scroll updates
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // Tell ScrollTrigger to use these proxy methods for the "[data-scroll-container]" element
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all!
        pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
    });
    
    // Each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // After everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
    return locoScroll;
}

export default locomotiveAnimation;