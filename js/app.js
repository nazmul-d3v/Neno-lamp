import { sound } from './audio.js';
import { ParticleEngine } from './particles.js';
import { LampController } from './lamp.js';

// Color themes configuration
const THEMES = {
    cyan: {
        name: 'Neon Cyan',
        primary: '#00f2fe',
        secondary: '#00c6ff',
        glow: 'rgba(0, 242, 254, 0.45)',
        rgb: { r: 0, g: 242, b: 254 },
        cardBorder: 'rgba(0, 242, 254, 0.22)',
        btnText: '#04101e'
    },
    magenta: {
        name: 'Cyber Magenta',
        primary: '#ff2a85',
        secondary: '#f72585',
        glow: 'rgba(255, 42, 133, 0.45)',
        rgb: { r: 255, g: 42, b: 133 },
        cardBorder: 'rgba(255, 42, 133, 0.22)',
        btnText: '#ffffff'
    },
    amber: {
        name: 'Warm Tungsten',
        primary: '#ffaa00',
        secondary: '#ffd133',
        glow: 'rgba(255, 170, 0, 0.45)',
        rgb: { r: 255, g: 170, b: 0 },
        cardBorder: 'rgba(255, 170, 0, 0.22)',
        btnText: '#1a1202'
    },
    emerald: {
        name: 'Matrix Green',
        primary: '#00ff88',
        secondary: '#05ffa1',
        glow: 'rgba(0, 255, 136, 0.45)',
        rgb: { r: 0, g: 255, b: 136 },
        cardBorder: 'rgba(0, 255, 136, 0.22)',
        btnText: '#031a0e'
    },
    violet: {
        name: 'Ultra Violet',
        primary: '#a855f7',
        secondary: '#9333ea',
        glow: 'rgba(168, 85, 247, 0.45)',
        rgb: { r: 168, g: 85, b: 247 },
        cardBorder: 'rgba(168, 85, 247, 0.22)',
        btnText: '#ffffff'
    }
};

class App {
    constructor() {
        this.currentMode = 'signin'; // 'signin' | 'signup' | 'forgot'
        this.currentTheme = 'cyan';
        this.particles = null;
        this.lamp = null;
    }

    start() {
        // Initialize particle system
        this.particles = new ParticleEngine('ambientCanvas');

        // Initialize lamp controller
        this.lamp = new LampController(this.particles);

        // Bind UI events
        this.bindTabs();
        this.bindPasswordToggles();
        this.bindForms();
        this.bindThemePicker();
        this.bindAudioToggle();
        this.bindSocialButtons();
        this.bindForgotLinks();

        // Welcome banner close
        const closeBanner = document.getElementById('closeToast');
        if (closeBanner) {
            closeBanner.addEventListener('click', () => {
                document.getElementById('successToast').classList.remove('show');
            });
        }

        // Lamp off banner click to illuminate
        const lampOffBanner = document.getElementById('lampOffBanner');
        if (lampOffBanner) {
            lampOffBanner.addEventListener('click', () => {
                if (this.lamp && !this.lamp.isOn) {
                    this.lamp.toggle();
                    this.lamp.recoilSpring(15);
                }
            });
        }
    }

    bindTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabIndicator = document.querySelector('.tab-indicator');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                sound.playButtonClick();
                const target = btn.dataset.tab;
                this.switchMode(target);

                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Move indicator
                if (tabIndicator) {
                    if (target === 'signup') {
                        tabIndicator.style.transform = 'translateX(100%)';
                    } else {
                        tabIndicator.style.transform = 'translateX(0%)';
                    }
                }
            });
        });
    }

    switchMode(mode) {
        this.currentMode = mode;
        const signinForm = document.getElementById('signinForm');
        const signupForm = document.getElementById('signupForm');
        const forgotForm = document.getElementById('forgotForm');
        const tabContainer = document.getElementById('authTabs');
        const cardTitle = document.getElementById('cardTitle');
        const cardSubtitle = document.getElementById('cardSubtitle');

        // Hide all forms first
        [signinForm, signupForm, forgotForm].forEach(f => {
            if (f) f.classList.remove('active-form');
        });

        if (mode === 'signin') {
            tabContainer.style.display = 'grid';
            signinForm.classList.add('active-form');
            cardTitle.textContent = 'Welcome';
            cardSubtitle.textContent = 'Enter your credentials to access your account.';
        } else if (mode === 'signup') {
            tabContainer.style.display = 'grid';
            signupForm.classList.add('active-form');
            cardTitle.textContent = 'Get Started';
            cardSubtitle.textContent = 'Create your secure account in seconds.';
        } else if (mode === 'forgot') {
            tabContainer.style.display = 'none';
            forgotForm.classList.add('active-form');
            cardTitle.textContent = 'Reset Access';
            cardSubtitle.textContent = 'Enter your email to receive recovery instructions.';
        }

        // Recompute beam geometry in case form height shifted
        setTimeout(() => {
            if (this.lamp) this.lamp.updateBeamGeometry();
        }, 120);
    }

    bindForgotLinks() {
        const forgotLink = document.getElementById('forgotPasswordLink');
        const backToSignIn = document.getElementById('backToSignInBtn');

        if (forgotLink) {
            forgotLink.addEventListener('click', (e) => {
                e.preventDefault();
                sound.playButtonClick();
                this.switchMode('forgot');
            });
        }

        if (backToSignIn) {
            backToSignIn.addEventListener('click', (e) => {
                e.preventDefault();
                sound.playButtonClick();
                this.switchMode('signin');
                const signinTab = document.querySelector('[data-tab="signin"]');
                if (signinTab) signinTab.click();
            });
        }
    }

    bindPasswordToggles() {
        const toggleButtons = document.querySelectorAll('.toggle-password-btn');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                sound.playButtonClick();
                const targetId = btn.dataset.target;
                const input = document.getElementById(targetId);
                if (!input) return;

                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';

                const eyeIcon = btn.querySelector('.eye-icon');
                const eyeOffIcon = btn.querySelector('.eye-off-icon');

                if (eyeIcon && eyeOffIcon) {
                    eyeIcon.style.display = isPassword ? 'none' : 'block';
                    eyeOffIcon.style.display = isPassword ? 'block' : 'none';
                }
            });
        });
    }

    bindForms() {
        const signinForm = document.getElementById('signinForm');
        const signupForm = document.getElementById('signupForm');
        const forgotForm = document.getElementById('forgotForm');

        if (signinForm) {
            signinForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAuthSubmit(signinForm, 'Signing In...', 'Welcome back!');
            });
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const p1 = document.getElementById('signupPassword')?.value;
                const p2 = document.getElementById('signupConfirm')?.value;
                if (p1 !== p2) {
                    this.showToast('Passwords do not match. Please verify.', 'error');
                    return;
                }
                this.handleAuthSubmit(signupForm, 'Creating Account...', 'Account created successfully!');
            });
        }

        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAuthSubmit(forgotForm, 'Sending Link...', 'Password recovery email sent!');
            });
        }
    }

    handleAuthSubmit(form, loadingText, successMsg) {
        sound.playButtonClick();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="btn-spinner"></span>
            <span>${loadingText}</span>
        `;

        // Simulate secure API roundtrip
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;

            sound.playSuccessChime();
            this.showToast(successMsg, 'success');

            // Trigger surge glow on the lamp and card!
            document.body.classList.add('success-surge');
            setTimeout(() => {
                document.body.classList.remove('success-surge');
            }, 1200);
        }, 1100);
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('successToast');
        const toastText = document.getElementById('toastMessage');
        const toastIcon = document.getElementById('toastIcon');

        if (!toast || !toastText) return;

        toastText.textContent = message;

        if (type === 'success') {
            toast.classList.remove('error-toast');
            toast.classList.add('success-toast');
            if (toastIcon) toastIcon.textContent = '✓';
        } else {
            toast.classList.remove('success-toast');
            toast.classList.add('error-toast');
            if (toastIcon) toastIcon.textContent = '!';
        }

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    bindSocialButtons() {
        const socialButtons = document.querySelectorAll('.social-btn');
        socialButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                sound.playButtonClick();
                const provider = btn.dataset.provider;
                this.showToast(`Connecting via ${provider}...`, 'success');
            });
        });
    }

    bindThemePicker() {
        const themePills = document.querySelectorAll('.theme-pill');
        themePills.forEach(pill => {
            pill.addEventListener('click', () => {
                sound.playButtonClick();
                const themeKey = pill.dataset.theme;
                this.setTheme(themeKey);

                themePills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            });
        });
    }

    setTheme(key) {
        const theme = THEMES[key];
        if (!theme) return;

        this.currentTheme = key;
        const root = document.documentElement;

        root.style.setProperty('--neon-primary', theme.primary);
        root.style.setProperty('--neon-secondary', theme.secondary);
        root.style.setProperty('--neon-glow', theme.glow);
        root.style.setProperty('--card-border-glow', theme.cardBorder);
        root.style.setProperty('--neon-btn-text', theme.btnText);

        if (this.particles) {
            this.particles.setColor(theme.rgb);
        }
    }

    bindAudioToggle() {
        const soundBtn = document.getElementById('toggleSoundBtn');
        if (!soundBtn) return;

        soundBtn.addEventListener('click', () => {
            const isMuted = sound.toggleMute();
            soundBtn.classList.toggle('muted', isMuted);
            const iconSound = soundBtn.querySelector('.sound-on-icon');
            const iconMuted = soundBtn.querySelector('.sound-off-icon');
            if (iconSound && iconMuted) {
                iconSound.style.display = isMuted ? 'none' : 'block';
                iconMuted.style.display = isMuted ? 'block' : 'none';
            }
        });
    }
}

// Instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.start();
});
