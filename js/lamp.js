import { sound } from './audio.js';

export class LampController {
    constructor(particleEngine) {
        this.particles = particleEngine;
        this.isOn = true;
        this.isDragging = false;
        this.startY = 0;
        this.currentPull = 0;
        this.maxPull = 55;
        this.pullThreshold = 22;
        this.springAnim = null;

        // Elements
        this.cordGroup = document.getElementById('pullCordGroup');
        this.cordLine = document.getElementById('pullCordLine');
        this.cordBead = document.getElementById('pullCordBead');
        this.lampAperture = document.getElementById('lampAperture');
        this.lightBeam = document.getElementById('lightBeam');
        this.body = document.body;

        // Cord original coordinates from SVG
        this.anchorX = 228; // Anchored under lamp shade
        this.anchorY = 246;
        this.restBeadY = 335;
        this.currentBeadY = this.restBeadY;

        this.init();
    }

    init() {
        this.setupPullCord();
        this.setupBaseSwitch();
        this.setupKeyboard();
        this.updateBeamGeometry();

        window.addEventListener('resize', () => {
            this.updateBeamGeometry();
        });

        // Initialize state
        this.applyState(true, false);
    }

    setupPullCord() {
        if (!this.cordBead) return;

        const onStart = (e) => {
            e.preventDefault();
            this.isDragging = true;
            if (this.springAnim) cancelAnimationFrame(this.springAnim);
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            this.startY = clientY;
            this.currentPull = 0;
            document.addEventListener('mousemove', onMove);
            document.addEventListener('touchmove', onMove, { passive: false });
            document.addEventListener('mouseup', onEnd);
            document.addEventListener('touchend', onEnd);
        };

        const onMove = (e) => {
            if (!this.isDragging) return;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const dy = clientY - this.startY;
            // Damped stretch curve
            this.currentPull = Math.max(0, Math.min(this.maxPull, dy * 0.8));
            this.renderCord(this.currentPull);

            sound.playTensionSound(this.currentPull / this.maxPull);
        };

        const onEnd = () => {
            if (!this.isDragging) return;
            this.isDragging = false;

            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchend', onEnd);

            if (this.currentPull >= this.pullThreshold) {
                // Toggled!
                this.toggle();
            } else if (this.currentPull < 5) {
                // Treated as a direct click
                this.toggle();
            }

            // Spring release bounce animation
            this.recoilSpring(this.currentPull);
        };

        this.cordBead.addEventListener('mousedown', onStart);
        this.cordBead.addEventListener('touchstart', onStart, { passive: false });

        // Also allow clicking the entire cord line
        if (this.cordLine) {
            this.cordLine.addEventListener('mousedown', onStart);
            this.cordLine.addEventListener('touchstart', onStart, { passive: false });
        }
    }

    setupBaseSwitch() {
        const baseSwitch = document.getElementById('lampBaseSwitch');
        if (baseSwitch) {
            baseSwitch.addEventListener('click', () => {
                this.toggle();
                this.recoilSpring(15);
            });
        }

        const lampShade = document.getElementById('lampHeadGroup');
        if (lampShade) {
            lampShade.addEventListener('click', (e) => {
                // If not clicking cord
                if (e.target.closest('#pullCordGroup')) return;
                this.toggle();
                this.recoilSpring(12);
            });
        }
    }

    setupKeyboard() {
        window.addEventListener('keydown', (e) => {
            // Ignore if active in input field
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
            if (e.key === ' ' || e.key.toLowerCase() === 'l') {
                e.preventDefault();
                this.toggle();
                this.recoilSpring(20);
            }
        });
    }

    renderCord(pullOffset) {
        if (!this.cordLine || !this.cordBead) return;
        const beadY = this.restBeadY + pullOffset;
        this.currentBeadY = beadY;

        // Render chain / line
        this.cordLine.setAttribute('x1', this.anchorX);
        this.cordLine.setAttribute('y1', this.anchorY);
        this.cordLine.setAttribute('x2', this.anchorX);
        this.cordLine.setAttribute('y2', beadY);

        // Render bead position
        this.cordBead.setAttribute('transform', `translate(0, ${pullOffset})`);
    }

    recoilSpring(initialDisplacement) {
        let displacement = initialDisplacement;
        let velocity = 0;
        const stiffness = 0.22;
        const damping = 0.72;

        const step = () => {
            const force = -stiffness * displacement;
            velocity = (velocity + force) * damping;
            displacement += velocity;

            this.renderCord(displacement);

            if (Math.abs(displacement) > 0.4 || Math.abs(velocity) > 0.4) {
                this.springAnim = requestAnimationFrame(step);
            } else {
                this.renderCord(0);
                this.springAnim = null;
            }
        };

        if (this.springAnim) cancelAnimationFrame(this.springAnim);
        this.springAnim = requestAnimationFrame(step);
    }

    toggle() {
        this.isOn = !this.isOn;
        this.applyState(this.isOn, true);
    }

    applyState(isOn, playAudio = true) {
        this.isOn = isOn;

        if (playAudio) {
            sound.playSwitchClick(isOn);
        }

        if (isOn) {
            this.body.classList.remove('lamp-off');
            this.body.classList.add('lamp-on');
        } else {
            this.body.classList.remove('lamp-on');
            this.body.classList.add('lamp-off');
        }

        if (this.particles) {
            this.particles.setLampState(isOn);
        }

        // Trigger electric micro-flicker on turn-on
        if (isOn && playAudio) {
            this.electricFlicker();
        }

        this.updateBeamGeometry();
    }

    electricFlicker() {
        const beam = this.lightBeam;
        if (!beam) return;
        beam.classList.add('flicker-on');
        setTimeout(() => {
            beam.classList.remove('flicker-on');
        }, 320);
    }

    updateBeamGeometry() {
        if (!this.particles) return;

        const lampSvg = document.getElementById('lampSvg');
        const card = document.getElementById('authCard');
        if (!lampSvg || !card) return;

        const lampRect = lampSvg.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        // Calculate aperture coordinates in screen pixels
        // Aperture is roughly at (x: 55%, y: 35%) of lamp SVG
        const originX = lampRect.left + lampRect.width * 0.52;
        const originY = lampRect.top + lampRect.height * 0.36;

        // Light cone reaches right past the card
        const targetTopY = Math.max(0, cardRect.top - 120);
        const targetBottomY = Math.min(window.innerHeight, cardRect.bottom + 120);
        const targetRightX = Math.min(window.innerWidth, cardRect.right + 180);

        const polygon = [
            { x: originX, y: originY - 25 },
            { x: targetRightX, y: targetTopY },
            { x: targetRightX, y: targetBottomY },
            { x: originX, y: originY + 25 }
        ];

        this.particles.setBeamGeometry(polygon);
    }
}
