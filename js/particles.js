/**
 * Volumetric Particle Engine
 * Simulates atmospheric dust motes floating in air that catch the lamp's light beam.
 */
export class ParticleEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 65;
        this.isLampOn = true;
        this.lampIntensity = 1.0;
        this.targetIntensity = 1.0;
        this.colorRgb = { r: 0, g: 242, b: 254 }; // Default Cyan
        this.beamPolygon = null;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle());
        }

        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    resize() {
        if (!this.canvas) return;
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    setColor(rgb) {
        this.colorRgb = rgb;
    }

    setLampState(isOn) {
        this.isLampOn = isOn;
        this.targetIntensity = isOn ? 1.0 : 0.05;
    }

    setBeamGeometry(polygon) {
        // polygon is array of {x, y} defining the 4 vertices of the light cone
        this.beamPolygon = polygon;
    }

    createParticle() {
        return {
            x: Math.random() * (this.width || window.innerWidth),
            y: Math.random() * (this.height || window.innerHeight),
            radius: Math.random() * 2.2 + 0.8,
            vx: (Math.random() - 0.5) * 0.4 + 0.15, // slight rightward drift toward card
            vy: (Math.random() - 0.5) * 0.35 - 0.05, // subtle float upward
            alpha: Math.random() * 0.5 + 0.2,
            pulseSpeed: Math.random() * 0.02 + 0.01,
            pulseOffset: Math.random() * Math.PI * 2
        };
    }

    isInsideBeam(x, y) {
        if (!this.beamPolygon || this.beamPolygon.length < 3) {
            // Fallback estimation: if in right half of screen around vertical center
            const cx = this.width * 0.3;
            const cy = this.height * 0.45;
            const dx = x - cx;
            if (dx > 0 && dx < this.width * 0.65) {
                const spread = dx * 0.55;
                return Math.abs(y - cy) < spread;
            }
            return false;
        }

        // Ray casting algorithm for point in polygon
        let inside = false;
        for (let i = 0, j = this.beamPolygon.length - 1; i < this.beamPolygon.length; j = i++) {
            const xi = this.beamPolygon[i].x, yi = this.beamPolygon[i].y;
            const xj = this.beamPolygon[j].x, yj = this.beamPolygon[j].y;

            const intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    animate(timestamp) {
        if (!this.ctx) return;

        // Smoothly interpolate lamp intensity
        this.lampIntensity += (this.targetIntensity - this.lampIntensity) * 0.08;

        this.ctx.clearRect(0, 0, this.width, this.height);

        const { r, g, b } = this.colorRgb;

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            // Update position
            p.x += p.vx;
            p.y += p.vy;

            // Wrap around edges
            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;

            const inBeam = this.isInsideBeam(p.x, p.y);
            const pulse = (Math.sin(timestamp * 0.002 * p.pulseSpeed * 100 + p.pulseOffset) + 1) * 0.5;

            let finalAlpha = 0;
            let currentRadius = p.radius;

            if (inBeam) {
                // Inside beam: catches light, glows bright
                const beamBonus = this.lampIntensity * 0.7;
                finalAlpha = (p.alpha * 0.4 + beamBonus * 0.6) * (0.6 + pulse * 0.4);
                currentRadius = p.radius * (1.2 + pulse * 0.3);

                // Draw luminous glow halo
                const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius * 3);
                grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${finalAlpha * 0.9})`);
                grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${finalAlpha * 0.3})`);
                grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                this.ctx.fillStyle = grad;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, currentRadius * 3, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                // Outside beam: faint ambient stardust
                finalAlpha = 0.08 + pulse * 0.08;
                this.ctx.fillStyle = `rgba(180, 210, 240, ${finalAlpha})`;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, currentRadius * 0.75, 0, Math.PI * 2);
                this.ctx.fill();
            }

            // Draw core particle
            if (inBeam && this.lampIntensity > 0.2) {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, finalAlpha * 1.4)})`;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, currentRadius * 0.5, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }

        requestAnimationFrame(this.animate);
    }
}
