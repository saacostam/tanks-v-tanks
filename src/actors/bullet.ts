import { Actor, Color, Engine, Side, Vector } from "excalibur";

import { Tank } from ".";
import { ORANGE } from "../constants";
import { Tile } from "../enviroment";
import { Particle } from "../graphics";

export interface BulletConfig{
    x: number;
    y: number;
    color: Color;
    rotation: number;
}

export class Bullet extends Actor{
    public static Velocity = 300;
    public static BounceCountMax = 5;
    public static ParticleCountOnDeath = 10;

    private _bounceCounter = 0;

    constructor({
        x,
        y,
        color,
        rotation,
    }: BulletConfig){
        super({
            x: x,
            y: y,
            rotation: rotation,
            color: color,
            radius: 3,
        });

        const dir = new Vector(
            Math.cos(this.rotation),
            Math.sin(this.rotation),
        )
        this.pos = this.pos.add(dir.scale(Bullet.Velocity/10));

        this.vel.setTo(
            Math.cos(this.rotation) * Bullet.Velocity,
            Math.sin(this.rotation) * Bullet.Velocity,
        );

        this.on('collisionstart', (e) => {
            if (e.other instanceof Tile && e.other.isStatic){
                if (this._bounceCounter < Bullet.BounceCountMax){
                    switch (e.side){
                        case Side.Top:
                        case Side.Bottom:
                            this.rotation = -this.rotation;
                            break;
                        case Side.Right:
                        case Side.Left:
                            this.rotation = -(this.rotation - Math.PI/2) + Math.PI/2;
                            break;
                    }

                    const dir = new Vector(
                        Math.cos(e.actor.rotation) * Bullet.Velocity,
                        Math.sin(e.actor.rotation) * Bullet.Velocity,
                    )

                    e.actor.vel.setTo(dir.x, dir.y);                    
                    this._bounceCounter += 1;
                }else this.kill();
            }

            if (e.other instanceof Tank){
                e.other.kill();
            }
        })
    }

    update(_: Engine, __: number): void {
        this.scene?.add(
            new Particle({
                ttl: 200,
                radius: 2,
                velocity: 5,
                x: this.pos.x,
                y: this.pos.y,
                color: Math.random() < 0.5 ? Color.Yellow : ORANGE,
            })
        )
    }

    public kill(): void {
        for (let i = 0; i < Bullet.ParticleCountOnDeath; i++){
            this.scene?.add(
                new Particle({
                    x: this.pos.x,
                    y: this.pos.y,
                    color: this.color,
                    radius: 2,
                })
            )
        }
        super.kill();
    }
}
