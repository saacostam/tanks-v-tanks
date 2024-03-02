import { Actor, Color, Engine, Vector } from "excalibur";

interface ParticleConfig{
    x: number;
    y: number;
    color: Color;
    radius?: number;
}

export class Particle extends Actor{
    public static ParticleTTL = 500;
    public static ParticleVelocity = 100;

    private lifeTime = 0;

    constructor({
        x,
        y,
        color,
        radius,
    }: ParticleConfig){
        radius = radius || 3;

        super({
            x: x,
            y: y,
            color: color,
            radius: radius,
        });

        const VARIATION = 0.5;
        const amount = VARIATION + (2 * VARIATION * Math.random());
        const direction: Vector = (new Vector(-1 + (Math.random()*2), -1 + (Math.random()*2))).normalize().scale(Particle.ParticleVelocity * amount);

        this.vel.setTo(
            direction.x,
            direction.y,
        );

        this.lifeTime = 0;
    }

    update(_: Engine, delta: number): void {
        this.lifeTime += delta;

        this.graphics.opacity = (Particle.ParticleTTL - this.lifeTime)/Particle.ParticleTTL;

        if (this.lifeTime > Particle.ParticleTTL) this.kill();
    }
}
