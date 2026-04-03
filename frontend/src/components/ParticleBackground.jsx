import React, { useRef, useEffect } from 'react';

const ParticleBackground = ({ isHovered }) => {
  const canvasRef = useRef(null);
  const isHoveredRef = useRef(isHovered);

  // Sync state cleanly without triggering useEffect resets
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false }); // alpha false optimizes performance on opaque backgrounds
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    let particles = [];
    let targets = [];

    const init = () => {
      // 1. Secretly generate text mapping on an offscreen canvas
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      
      const ow = 800;
      const oh = 600;
      offCanvas.width = ow;
      offCanvas.height = oh;
      
      offCtx.fillStyle = 'white';
      offCtx.font = 'bold 500px Inter, system-ui, sans-serif'; 
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      // Draw the iconic curly braces
      offCtx.fillText('{ }', ow / 2, oh / 2);

      const data = offCtx.getImageData(0, 0, ow, oh).data;
      targets = [];
      
      // Sample pixels (stride of 6 for performance and dot density)
      for (let y = 0; y < oh; y += 6) {
        for (let x = 0; x < ow; x += 6) {
          const alpha = data[(y * ow + x) * 4 + 3];
          if (alpha > 128) {
             // Save coordinate relative to center
             targets.push({ x: x - (ow / 2), y: y - (oh / 2) });
          }
        }
      }

      // Fallback target if text failed to render
      if(targets.length === 0) targets.push({x:0, y:0});

      // 2. Initialize Particles
      particles = [];
      const numParticles = 2500; // High density field
      
      for(let i = 0; i < numParticles; i++) {
         // Cycle through valid targets guaranteeing the shape forces out cleanly
         const target = targets[i % targets.length];
         
         particles.push({
           x: Math.random() * w, 
           y: Math.random() * h,
           originX: Math.random() * w,
           originY: Math.random() * h,
           targetX: target.x,
           targetY: target.y,
           // Math noise attributes for organic idle movement
           phaseX: Math.random() * Math.PI * 2,
           phaseY: Math.random() * Math.PI * 2,
           speedX: (Math.random() * 0.001) + 0.0005,
           speedY: (Math.random() * 0.001) + 0.0005,
           size: Math.random() * 1.5 + 0.8,
           isCore: Math.random() > 0.3 // 70% particles form shape, 30% remain ambient noise
         });
      }
    };

    init();

    const resizeHandler = () => {
       w = canvas.width = window.innerWidth;
       h = canvas.height = window.innerHeight;
       // Recalculate original origins so they don't bunch up awkwardly on drastic resizes
       particles.forEach(p => {
           p.originX = Math.random() * w;
           p.originY = Math.random() * h;
       });
    };
    window.addEventListener('resize', resizeHandler);

    let frameId;
    const animate = () => {
       // Deep dark background matching Antigravity theme
       ctx.fillStyle = '#0a0a0a';
       ctx.fillRect(0, 0, w, h);
       
       const hovered = isHoveredRef.current;
       const cx = w / 2;
       const cy = h / 2;
       const time = Date.now();

       for(let p of particles) {
          // If hovered, particles belonging to the "core" snap into the { } glyph
          if (hovered && p.isCore) {
             // Destination coordinate on screen
             const destX = cx + p.targetX;
             const destY = cy + p.targetY;
             
             // Swift spring lerp algorithm towards target
             p.x += (destX - p.x) * 0.1;
             p.y += (destY - p.y) * 0.1;
             
             // Vibrant red color for the shape structure
             ctx.fillStyle = `rgba(239, 68, 68, ${p.size * 0.6})`;
          } else {
             // Idle float: Perlin-like mathematical drifting
             const driftX = p.originX + Math.sin(time * p.speedX + p.phaseX) * 40;
             const driftY = p.originY + Math.cos(time * p.speedY + p.phaseY) * 40;
             
             // Slow, lazy return to float vector
             p.x += (driftX - p.x) * 0.02;
             p.y += (driftY - p.y) * 0.02;

             // Silent star-like white ambient color
             ctx.fillStyle = `rgba(255, 255, 255, ${p.size * 0.15})`;
          }

          // Render particle
          ctx.beginPath();
          // To replicate IDX perfectly, we make them tiny lines instead of just circles 
          // to give a sense of directional momentum, or simple rectangles.
          ctx.fillRect(p.x, p.y, p.size, p.size * 1.5);
       }
       frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" 
      style={{ opacity: 0.9 }}
    />
  );
};

export default ParticleBackground;
