const hexRegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

/**
 * Particle Node/Object
 */
class Particle {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    particleColor: string;
    x: number;
    y: number;
    velocity: { x: number; y: number };
    #radius = 1.5;
    constructor(parent: ParticleNetwork) {
        this.canvas = parent.canvas;
        this.ctx = parent.ctx;
        this.particleColor = parent.options.particleColor;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.velocity = {
            x: (Math.random() - 0.5) * parent.options.velocity,
            y: (Math.random() - 0.5) * parent.options.velocity
        };
    }

    update() {
        if (this.x > this.canvas.width + 20 || this.x < -20) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y > this.canvas.height + 20 || this.y < -20) {
            this.velocity.y = -this.velocity.y;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.particleColor;
        this.ctx.globalAlpha = 0.7;
        this.ctx.arc(this.x, this.y, this.#radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}

export interface ParticleNetworkOptions {
    particleColor: string;
    background: string;
    interactive: boolean;
    density: 'high' | 'low' | number;
    velocity: number | string; // fast, slow, none, {number}
}
export interface ParticleNetworkOptionsInner {
    particleColor: string;
    background: string;
    interactive: boolean;
    density: number;
    velocity: number;
}
class ParticleNetwork {
    container: HTMLDivElement = document.createElement('div');
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    options: ParticleNetworkOptionsInner;
    bgDiv = document.createElement('div');
    particles: Particle[];
    mouseParticle: Particle | undefined;
    constructor(container: HTMLDivElement, options: Partial<ParticleNetworkOptions> = {}) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.container.dataset.width = `${this.container.offsetWidth}`;
        this.container.dataset.height = `${this.container.offsetHeight}`;

        this.particles = [];

        this.options = {
            particleColor: options.particleColor ?? '#fff',
            background: options.background ?? '#1a252f',
            interactive: options.interactive ?? true,
            velocity: this.#setVelocity(options.velocity ?? ''),
            density: this.#setDensity(options.density ?? ''),
        };

        this.init();
    }

    init() {
        this.bgDiv.id = 'particle-network-bg';
        this.#setStyles(this.bgDiv, {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            'z-index': 1
        });
        this.container.appendChild(this.bgDiv);

        if (this.#setBackground() === false)
            return;

        if (!(hexRegExp).test(this.options.particleColor)) {
            console.error('Please specify a valid particleColor hexadecimal color');
            return false;
        }

        this.canvas.width = Number(this.container.dataset.width);
        this.canvas.height = Number(this.container.dataset.height);
        this.#setStyles(this.container, { position: 'relative' });
        this.#setStyles(this.canvas, { 'z-index': '20', position: 'relative', 'pointer-events': 'none' });

        let resetTimer: ReturnType<typeof setTimeout>;
        window.addEventListener('resize', () => {
            if (`${this.container.offsetWidth}` === (this.container.dataset.width ?? '') &&
                `${this.container.offsetHeight}` === (this.container.dataset.height ?? '')) {
                return false;
            }

            this.canvas.width = this.container.offsetWidth;
            this.container.dataset.width = `${this.container.offsetWidth}`;
            this.container.dataset.height = `${this.container.offsetHeight}`;
            this.canvas.height = this.container.offsetHeight;

            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => {
                this.particles = [];
                for (let i = 0; i < this.canvas.width * this.canvas.height / this.options.density; i++) {
                    this.particles.push(new Particle(this));
                }
                if (this.options.interactive && this.mouseParticle) {
                    this.particles.push(this.mouseParticle);
                }
                requestAnimationFrame(this.update.bind(this));
            }, 500);
        });

        this.particles = [];
        for (let i = 0; i < this.canvas.width * this.canvas.height / this.options.density; i++) {
            this.particles.push(new Particle(this));
        }

        // TODO this may need updated when options update eventually
        if (this.options.interactive) {
            this.mouseParticle = new Particle(this);
            this.mouseParticle.velocity = { x: 0, y: 0 };
            this.particles.push(this.mouseParticle);

            this.canvas.addEventListener('mousemove', (e) => {
                if (!this.mouseParticle) return;
                this.mouseParticle.x = e.clientX - this.canvas.offsetLeft;
                this.mouseParticle.y = e.clientY - this.canvas.offsetTop;
            });

            this.canvas.addEventListener('mouseup', () => {
                if (!this.mouseParticle) return;
                this.mouseParticle.velocity = {
                    x: (Math.random() - 0.5) * this.options.velocity,
                    y: (Math.random() - 0.5) * this.options.velocity
                };
                this.mouseParticle = new Particle(this);
                this.mouseParticle.velocity = { x: 0, y: 0 };
                this.particles.push(this.mouseParticle);
            });
        }

        requestAnimationFrame(this.update.bind(this));
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 1;

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();

            for (let j = this.particles.length - 1; j > i; j--) {
                const distance = Math.sqrt(
                    (this.particles[i].x - this.particles[j].x) ** 2 +
                    (this.particles[i].y - this.particles[j].y) ** 2
                );
                if (distance > 120) continue;

                this.ctx.beginPath();
                this.ctx.strokeStyle = this.options.particleColor;
                this.ctx.globalAlpha = (120 - distance) / 120;
                this.ctx.lineWidth = 0.7;
                this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                this.ctx.stroke();
            }
        }

        if (this.options.velocity !== 0) {
            requestAnimationFrame(this.update.bind(this));
        }
    }

    updateOptions(options: Partial<ParticleNetworkOptions>) {
        Object.assign(this.options, options);
        this.#setBackground();
    }

    #velocityMap: Record<string, number> = {
        fast: 1,
        slow: 0.33,
        none: 0
    };
    #setVelocity(speed: number | string): number {
        return !speed
            ? 0.66
            : typeof speed === 'number' ? speed : this.#velocityMap[speed]
    }

    #setDensity(density: number | string): number {
        return density === 'high'
            ? 5000
            : density === 'low'
                ? 20000
                : typeof density === 'number'
                    ? density
                    : 10000;
    }

    #setBackground() {
        if ((hexRegExp).test(this.options.background)) {
            this.#setStyles(this.bgDiv, { background: this.options.background });
        } else if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(this.options.background)) {
            this.#setStyles(this.bgDiv, {
                background: `url("${this.options.background}") no-repeat center`,
                'background-size': 'cover'
            });
        } else {
            console.error('Please specify a valid background image or hexadecimal color');
            return false;
        }
    }

    #setStyles(div: HTMLElement, styles: Record<string, string | number>) {
        Object.entries(styles).forEach(([property, value]) => {
            div.style.setProperty(property, `${value}`)
        });
    }
}

export default ParticleNetwork;