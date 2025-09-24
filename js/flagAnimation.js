function flagAnimation() {
    const flagElements = document.querySelectorAll('.flag-animation');
    
    flagElements.forEach(element => {
        const flagImage = element.getAttribute('data-flag-image');
        
        if (!flagImage) return;
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        element.appendChild(canvas);
        
        // Set up canvas
        const ctx = canvas.getContext('2d');
        let width = element.offsetWidth;
        let height = element.offsetHeight;
        
        canvas.width = width;
        canvas.height = height;
        
        // Load flag image
        const img = new Image();
        img.src = flagImage;
        
        // Flag animation variables
        let points = [];
        const rows = 15;
        const cols = 15;
        const spacing = width / cols;
        
        // Create points grid
        for (let y = 0; y <= rows; y++) {
            for (let x = 0; x <= cols; x++) {
                points.push({
                    x: x * spacing,
                    y: y * (height / rows),
                    originX: x * spacing,
                    originY: y * (height / rows),
                    vx: 0,
                    vy: 0
                });
            }
        }
        
        // Mouse tracking
        let mouseX = 0;
        let mouseY = 0;
        let mouseRadius = 100;
        
        element.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        
        element.addEventListener('mouseleave', () => {
            mouseX = undefined;
            mouseY = undefined;
        });
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Update points
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                
                // Apply mouse influence
                if (mouseX !== undefined && mouseY !== undefined) {
                    const dx = mouseX - point.x;
                    const dy = mouseY - point.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouseRadius) {
                        const angle = Math.atan2(dy, dx);
                        const force = (mouseRadius - distance) / mouseRadius;
                        
                        point.vx += Math.cos(angle) * force * 0.2;
                        point.vy += Math.sin(angle) * force * 0.2;
                    }
                }
                
                // Apply spring forces
                point.vx += (point.originX - point.x) * 0.05;
                point.vy += (point.originY - point.y) * 0.05;
                
                // Apply damping
                point.vx *= 0.9;
                point.vy *= 0.9;
                
                // Update position
                point.x += point.vx;
                point.y += point.vy;
            }
            
            // Draw flag
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const i = y * (cols + 1) + x;
                    const p0 = points[i];
                    const p1 = points[i + 1];
                    const p2 = points[i + cols + 1];
                    const p3 = points[i + cols + 2];
                    
                    const u0 = x / cols;
                    const v0 = y / rows;
                    const u1 = (x + 1) / cols;
                    const v1 = (y + 1) / rows;
                    
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(p0.x, p0.y);
                    ctx.lineTo(p1.x, p1.y);
                    ctx.lineTo(p3.x, p3.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.closePath();
                    
                    // Create pattern from image
                    const pattern = ctx.createPattern(img, 'no-repeat');
                    
                    // Apply transformation to pattern
                    const matrix = new DOMMatrix();
                    matrix.scaleSelf(width / img.width, height / img.height);
                    pattern.setTransform(matrix);
                    
                    ctx.fillStyle = pattern;
                    ctx.fill();
                    ctx.restore();
                }
            }
            
            requestAnimationFrame(animate);
        }
        
                // Start animation when image is loaded
                img.onload = () => {
                    animate();
                };
                
                // Handle window resize
                window.addEventListener('resize', () => {
                    width = element.offsetWidth;
                    height = element.offsetHeight;
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    // Recalculate points grid
                    points = [];
                    for (let y = 0; y <= rows; y++) {
                        for (let x = 0; x <= cols; x++) {
                            points.push({
                                x: x * (width / cols),
                                y: y * (height / rows),
                                originX: x * (width / cols),
                                originY: y * (height / rows),
                                vx: 0,
                                vy: 0
                            });
                        }
                    }
                });
            });
        }
        
        export default flagAnimation;