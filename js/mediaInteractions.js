function mediaInteractions() {
    // Enhanced video interactions
    const videoElements = document.querySelectorAll('video');
    
    videoElements.forEach(video => {
        // Create video controls wrapper
        const videoWrapper = document.createElement('div');
        videoWrapper.classList.add('video-wrapper');
        video.parentNode.insertBefore(videoWrapper, video);
        videoWrapper.appendChild(video);
        
        // Create custom play button
        const playButton = document.createElement('button');
        playButton.classList.add('video-play-btn');
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24">
                <polygon points="5,3 19,12 5,21" fill="currentColor"/>
            </svg>
        `;
        videoWrapper.appendChild(playButton);
        
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.classList.add('video-progress');
        const progressFill = document.createElement('div');
        progressFill.classList.add('video-progress-fill');
        progressBar.appendChild(progressFill);
        videoWrapper.appendChild(progressBar);
        
        // Play/pause functionality
        playButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                videoWrapper.classList.add('playing');
            } else {
                video.pause();
                videoWrapper.classList.remove('playing');
            }
        });
        
        // Click on video to play/pause
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                videoWrapper.classList.add('playing');
            } else {
                video.pause();
                videoWrapper.classList.remove('playing');
            }
        });
        
        // Update progress bar
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressFill.style.width = `${progress}%`;
        });
        
        // Click on progress bar to seek
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        });
        
        // Add hover effect
        videoWrapper.addEventListener('mouseenter', () => {
            gsap.to(playButton, {
                scale: 1.1,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        videoWrapper.addEventListener('mouseleave', () => {
            if (!video.paused) {
                gsap.to(playButton, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in"
                });
            }
        });
        
        // Auto-pause when out of view
        ScrollTrigger.create({
            trigger: videoWrapper,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
                if (videoWrapper.classList.contains('autoplay')) {
                    video.play();
                    videoWrapper.classList.add('playing');
                }
            },
            onLeave: () => {
                video.pause();
                videoWrapper.classList.remove('playing');
            },
            onEnterBack: () => {
                if (videoWrapper.classList.contains('autoplay')) {
                    video.play();
                    videoWrapper.classList.add('playing');
                }
            },
            onLeaveBack: () => {
                video.pause();
                videoWrapper.classList.remove('playing');
            }
        });
    });
    
    // Enhanced image interactions with Shery.js
    Shery.imageEffect(".enhanced-image", {
        style: 5, // Gooey style
        config: {
            "a": { "value": 2, "range": [0, 30] },
            "b": { "value": 0.75, "range": [-1, 1] },
            "zindex": { "value": -9996999, "range": [-9999999, 9999999] },
            "aspect": { "value": 0.7241195453907675 },
            "gooey": { "value": true },
            "infiniteGooey": { "value": true },
            "growSize": { "value": 4, "range": [1, 15] },
            "durationOut": { "value": 1, "range": [0.1, 5] },
            "durationIn": { "value": 1.5, "range": [0.1, 5] },
            "displaceAmount": { "value": 0.5 },
            "masker": { "value": true },
            "maskVal": { "value": 1.33, "range": [1, 5] },
            "scrollType": { "value": 0 },
            "geoVertex": { "range": [1, 64], "value": 1 },
            "noEffectGooey": { "value": true },
            "onMouse": { "value": 1 },
            "noise_speed": { "value": 0.2, "range": [0, 10] },
            "metaball": { "value": 0.33, "range": [0, 2] },
            "discard_threshold": { "value": 0.5, "range": [0, 1] },
            "antialias_threshold": { "value": 0, "range": [0, 0.1] },
            "noise_height": { "value": 0.5, "range": [0, 2] },
            "noise_scale": { "value": 10, "range": [0, 100] }
        },
        gooey: true
    });
    
    // 3D tilt effect for images
    const tiltImages = document.querySelectorAll('.tilt-image');
    
    tiltImages.forEach(img => {
        // Add necessary classes
        img.classList.add('tilt-element');
        
        // Create overlay for hover effect
        const overlay = document.createElement('div');
        overlay.classList.add('tilt-overlay');
        img.parentNode.insertBefore(overlay, img.nextSibling);
        
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.classList.add('tilt-wrapper');
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        wrapper.appendChild(overlay);
        
        // Add hover animations
        wrapper.addEventListener('mouseenter', () => {
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(img, {
                scale: 1.05,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        wrapper.addEventListener('mouseleave', () => {
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });
            
            gsap.to(img, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        // 3D tilt effect
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width - 0.5;
            const yPercent = y / rect.height - 0.5;
            
            gsap.to(img, {
                rotationY: xPercent * 10,
                rotationX: -yPercent * 10,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power1.out"
            });
            
            // Move overlay slightly for parallax effect
            gsap.to(overlay, {
                x: xPercent * 20,
                y: yPercent * 20,
                duration: 0.4,
                ease: "power1.out"
            });
        });
        
        wrapper.addEventListener('mouseleave', () => {
            gsap.to(img, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });
            
            gsap.to(overlay, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

export default mediaInteractions;