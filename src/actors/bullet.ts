import { Actor, Color, Side, Vector } from "excalibur";
import { Tile } from "../enviroment";

export type BulletConfig = {
    x: number;
    y: number;
    rotation: number;
}

export class Bullet extends Actor{
    public static BulletVelocity = 300;
    public static BulletBounceCountMax = 5;

    private _bounceCounter = 0;

    constructor({
        x,
        y,
        rotation,
    }: BulletConfig){
        super({
            x: x,
            y: y,
            rotation: rotation,
            color: Color.Green,
            radius: 3,
        });

        const dir = new Vector(
            Math.cos(this.rotation),
            Math.sin(this.rotation),
        )
        this.pos = this.pos.add(dir.scale(Bullet.BulletVelocity/10));

        this.vel.setTo(
            Math.cos(this.rotation) * Bullet.BulletVelocity,
            Math.sin(this.rotation) * Bullet.BulletVelocity,
        );

        this.on('collisionstart', (e) => {
            if (e.other instanceof Tile && e.other.isStatic){
                if (this._bounceCounter < Bullet.BulletBounceCountMax){
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
                        Math.cos(e.actor.rotation) * Bullet.BulletVelocity,
                        Math.sin(e.actor.rotation) * Bullet.BulletVelocity,
                    )

                    e.actor.vel.setTo(dir.x, dir.y);                    
                    this._bounceCounter += 1;
                }else this.kill();
            }
        })
    }
}
