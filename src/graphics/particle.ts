import { Actor, Color, Engine, Vector } from "excalibur";

interface ParticleConfig{
    x: number;
    y: number;
    color: Color;
    ttl?: number;
    radius?: number;
    velocity?: number;
}

export class Particle extends Actor{
    public static TTL = 500;
    public static Velocity = 100;

    private lifeTime = 0;
    private ttl: number = 500;

    constructor({
        x,
        y,
        color,
        ttl,
        radius,
        velocity,
    }: ParticleConfig){
        ttl = ttl || Particle.TTL;
        radius = radius || 3;
        velocity = velocity || Particle.Velocity;

        super({
            x: x,
            y: y,
            color: color,
            radius: radius,
        });

        this.ttl = ttl;

        const VARIATION = 0.5;
        const amount = VARIATION + (2 * VARIATION * Math.random());
        const direction: Vector = (new Vector(-1 + (Math.random()*2), -1 + (Math.random()*2))).normalize().scale(velocity * amount);

        this.vel.setTo(
            direction.x,
            direction.y,
        );

        this.lifeTime = 0;
    }

    update(_: Engine, delta: number): void {
        this.lifeTime += delta;

        this.graphics.opacity = (this.ttl - this.lifeTime)/this.ttl;

        if (this.lifeTime > this.ttl) this.kill();
    }
}
