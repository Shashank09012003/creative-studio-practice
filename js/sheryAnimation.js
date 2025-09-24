function sheryAnimation() {
    // Initialize Shery.js effects
    
    // Magnetic effect for buttons and links
    Shery.makeMagnet(".magnetic", {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1
    });
    
    // Gooey effect for images
    Shery.imageEffect(".gooey-image", {
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
    
    // Text effect for headings
    Shery.textAnimate(".split-text", {
        style: 1,
        y: 10,
        delay: 0.1,
        duration: 2,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        multiplier: 0.1,
    });
}

export default sheryAnimation;