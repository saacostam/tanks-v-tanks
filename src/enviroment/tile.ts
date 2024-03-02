import { Actor, CollisionType, Color } from "excalibur";
import { SIZE } from "../constants";

export type TileConfig = {
    x: number;
    y: number;
    isStatic: boolean;

    color?: Color;
}

export class Tile extends Actor{
    public isStatic: boolean;

    constructor({
        x,
        y,
        isStatic,

        color,
    }: TileConfig){
        super({
            x: x,
            y: y,
            width: SIZE,
            height: SIZE,
            color: color || Color.Black,
            collisionType: isStatic ? CollisionType.Fixed : undefined,
        })

        this.isStatic = isStatic;
    }
}
