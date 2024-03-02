import { Actor, Color, Vector, Engine, Keys, CollisionType } from "excalibur";

import { Bullet } from ".";
import { ORANGE, SIZE } from "../constants";
import { Particle } from '../graphics';
import { tankImage } from "../resources";

const sprite = tankImage.toSprite();

interface TankConfig{
    x: number;
    y: number;
    color: Color;
}

export class Tank extends Actor{
    public static ForwardVelocity = 0.2;
    public static RotationVelocity = 0.003;
    public static ShootingTimeout = 1000;
    public static ParticleCountOnDeath = 20;

    private _health: number = 100;
    private _shootingTimeout = 0;

    constructor({
        x,
        y,
        color,
    }: TankConfig){
        super({
            x: x,
            y: y,
            width: SIZE,
            height: SIZE,
            color: color,
            collisionType: CollisionType.Active,
        })

        this.graphics.use(sprite);
    }

    public update(engine: Engine, delta: number): void {
        const { input: { keyboard } } = engine;

        this.updateTimeouts(delta);

        const moveForwardAmount = delta * Tank.ForwardVelocity;
        if (keyboard.isHeld(Keys.ArrowUp)){
            this.moveForward(moveForwardAmount);
        }else if (keyboard.isHeld(Keys.ArrowDown)){
            this.moveForward(-0.5 * moveForwardAmount);
        }

        const rotationAmount = delta * Tank.RotationVelocity;
        if (keyboard.isHeld(Keys.ArrowRight)){
            this.rotation += rotationAmount;
        }else if (keyboard.isHeld(Keys.ArrowLeft)){
            this.rotation -= rotationAmount;
        }

        if (keyboard.isHeld(Keys.Space) && this._shootingTimeout === 0){
            engine.currentScene.add(new Bullet({
                x: this.pos.x,
                y: this.pos.y,
                color: Color.Yellow,
                rotation: this.rotation,
            }));

            this._shootingTimeout = Tank.ShootingTimeout;
        }
    }

    public moveForward(amount: number){
        this.pos = this.pos.add((new Vector(Math.cos(this.rotation), Math.sin(this.rotation))).normalize().scale(amount));
    }

    public updateTimeouts(delta: number){
        this._shootingTimeout = Math.max(0, this._shootingTimeout - delta);
    }

    public kill(): void {
        for (let i = 0; i < Tank.ParticleCountOnDeath; i++){
            this.scene?.add(
                new Particle({
                    x: this.pos.x,
                    y: this.pos.y,
                    radius: 2,
                    color: Math.random() < 0.5 ? ORANGE : Color.White,
                })
            );
        }

        super.kill();
    }

    set health(val: number){
        this._health = Math.max(0, Math.min(val, 100));
    }

    get health(){
        return this._health;
    }
}
