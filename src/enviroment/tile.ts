import { Actor, CollisionType, Color } from "excalibur";

import { ALL_DIRECTIONS, SIZE } from "../constants";
import { brickImage, floorImage } from "../resources";

const brickSprite = brickImage.toSprite();
const floorSprite = floorImage.toSprite();

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
        if (isStatic) this.graphics.use(brickSprite);
        else {
            this.rotation = ALL_DIRECTIONS[Math.floor(Math.random() * ALL_DIRECTIONS.length)];

            this.graphics.use(floorSprite)
        };
    }
}
