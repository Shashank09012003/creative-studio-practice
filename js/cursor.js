// Advanced cursor system with multiple states and effects
function cursorAnimation() {
    // Create cursor elements
    const cursorOuter = document.createElement("div");
    const cursorInner = document.createElement("div");
    const cursorTrail = document.createElement("div");
    const cursorProgress = document.createElement("div");
    
    cursorOuter.classList.add("cursor-outer");
    cursorInner.classList.add("cursor-inner");
    cursorTrail.classList.add("cursor-trail");
    cursorProgress.classList.add("cursor-progress");
    
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
    document.body.appendChild(cursorTrail);
    document.body.appendChild(cursorProgress);
    
    // Variables for cursor movement
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    let isHovering = false;
    let isMagnetic = false;
    let isVideo = false;
    let isImage = false;
    let progressValue = 0;
    let magneticTarget = null;
    
    // Track mouse position
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create ripple effect on fast movement
        const speed = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
        if (speed > 10) {
            const skewX = gsap.utils.clamp(-15, 15, e.movementX);
            const skewY = gsap.utils.clamp(-15, 15, e.movementY);
            gsap.to(cursorInner, {
                skewX: skewX * 0.2,
                skewY: skewY * 0.2,
                duration: 0.3,
                ease: "power3.out",
                onComplete: () => {
                    gsap.to(cursorInner, {
                        skewX: 0,
                        skewY: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)"
                    });
                }
            });
        }
    });
    
    // Handle cursor states for different elements
    const handleElementInteraction = () => {
        // Magnetic elements (nav items, buttons)
        document.querySelectorAll(".magnetic").forEach(item => {
            item.addEventListener("mouseenter", () => {
                isMagnetic = true;
                magneticTarget = item;
                cursorOuter.classList.add("magnetic-active");
                gsap.to(cursorOuter, {
                    scale: 1.5,
                    opacity: 0.7,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    duration: 0.4
                });
            });
            
            item.addEventListener("mousemove", (e) => {
                if (isMagnetic && magneticTarget === item) {
                    const rect = item.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const strength = 0.3;
                    
                    gsap.to(item, {
                        x: (mouseX - centerX) * strength,
                        y: (mouseY - centerY) * strength,
                        duration: 0.6,
                        ease: "power3.out"
                    });
                }
            });
            
            item.addEventListener("mouseleave", () => {
                isMagnetic = false;
                magneticTarget = null;
                cursorOuter.classList.remove("magnetic-active");
                gsap.to(cursorOuter, {
                    scale: 1,
                    opacity: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    duration: 0.4
                });
                
                gsap.to(item, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
        
        // Video elements
        document.querySelectorAll("video").forEach(video => {
            video.addEventListener("mouseenter", () => {
                isVideo = true;
                cursorOuter.classList.add("video-active");
                cursorProgress.classList.add("active");
                
                // Set up progress tracking
                video.addEventListener("timeupdate", updateVideoProgress);
            });
            
            video.addEventListener("mouseleave", () => {
                isVideo = false;
                cursorOuter.classList.remove("video-active");
                cursorProgress.classList.remove("active");
                
                // Remove progress tracking
                video.removeEventListener("timeupdate", updateVideoProgress);
            });
            
            video.addEventListener("click", () => {
                if (video.paused) {
                    video.play();
                    cursorInner.classList.add("playing");
                } else {
                    video.pause();
                    cursorInner.classList.remove("playing");
                }
            });
        });
        
        // Image elements with gooey effect
        document.querySelectorAll(".gooey-image").forEach(img => {
            img.addEventListener("mouseenter", () => {
                isImage = true;
                cursorOuter.classList.add("image-active");
            });
            
            img.addEventListener("mouseleave", () => {
                isImage = false;
                cursorOuter.classList.remove("image-active");
            });
            
            img.addEventListener("mousemove", (e) => {
                if (isImage) {
                    const rect = img.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    
                    // Update Shery.js gooey effect position
                    // This connects with your existing Shery implementation
                    img.setAttribute("data-mouse-x", x);
                    img.setAttribute("data-mouse-y", y);
                }
            });
        });
        
        // Button ripple effect
        document.querySelectorAll(".btn").forEach(btn => {
            btn.addEventListener("mouseenter", () => {
                cursorOuter.classList.add("btn-active");
                gsap.to(cursorOuter, {
                    scale: 2,
                    opacity: 0.4,
                    duration: 0.4
                });
            });
            
            btn.addEventListener("mouseleave", () => {
                cursorOuter.classList.remove("btn-active");
                gsap.to(cursorOuter, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.4
                });
            });
            
            btn.addEventListener("click", (e) => {
                // Create ripple effect on click
                const ripple = document.createElement("div");
                ripple.classList.add("btn-ripple");
                btn.appendChild(ripple);
                
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                gsap.to(ripple, {
                    scale: 10,
                    opacity: 0,
                    duration: 0.8,
                    onComplete: () => {
                        ripple.remove();
                    }
                });
            });
        });
    };
    
    // Update video progress indicator
    function updateVideoProgress(e) {
        const video = e.target;
        progressValue = (video.currentTime / video.duration) * 100;
        cursorProgress.style.background = `conic-gradient(#fff ${progressValue}%, transparent ${progressValue}%)`;
    }
    
    // Animation loop for smooth cursor movement
    const animateCursor = () => {
        // Smooth cursor following with easing
        cursorX = gsap.utils.interpolate(cursorX, mouseX, 0.15);
        cursorY = gsap.utils.interpolate(cursorY, mouseY, 0.15);
        
        // Trail follows with delay
        trailX = gsap.utils.interpolate(trailX, mouseX, 0.08);
        trailY = gsap.utils.interpolate(trailY, mouseY, 0.08);
        
        // Apply positions
        cursorInner.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorOuter.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;
        cursorProgress.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        // Continue animation loop
        requestAnimationFrame(animateCursor);
    };
    
    // Hide default cursor
    document.body.style.cursor = "none";
    
    // Initialize cursor interactions
    handleElementInteraction();
    animateCursor();
    
    // Handle cursor visibility on page boundaries
    document.addEventListener("mouseleave", () => {
        cursorOuter.style.opacity = "0";
        cursorInner.style.opacity = "0";
        cursorTrail.style.opacity = "0";
        cursorProgress.style.opacity = "0";
    });
    
    document.addEventListener("mouseenter", () => {
        cursorOuter.style.opacity = "1";
        cursorInner.style.opacity = "1";
        cursorTrail.style.opacity = "1";
        cursorProgress.style.opacity = "1";
    });
    
    // Handle cursor on scroll
    window.addEventListener("scroll", () => {
        const scrollSpeed = Math.abs(window.scrollY - window.lastScrollY || 0);
        window.lastScrollY = window.scrollY;
        
        if (scrollSpeed > 30) {
            gsap.to(cursorInner, {
                scale: 0.8,
                duration: 0.2
            });
            gsap.to(cursorOuter, {
                scale: 1.2,
                opacity: 0.5,
                duration: 0.2
            });
        } else {
            gsap.to(cursorInner, {
                scale: 1,
                duration: 0.3
            });
            gsap.to(cursorOuter, {
                scale: 1,
                opacity: 1,
                duration: 0.3
            });
        }
    });
}

export default cursorAnimation;