import { Color, Engine } from "excalibur";
import { LevelTile } from ".";
import { Tile } from "../enviroment";
import { SIZE } from "../constants";

export function addLevelToEngine(engine: Engine, level: LevelTile[][]){
    level.forEach(
        (row, y) => (
            row.forEach(
                (level, x) => {
                    switch (level.type){
                        case "empty":
                            engine.currentScene.add(new Tile({
                                x: (x * SIZE) + SIZE/2,
                                y: (y * SIZE) + SIZE/2,
                                color: Color.ExcaliburBlue,
                                isStatic: false,
                            }))
                            break;
                        case "static":
                            engine.currentScene.add(new Tile({
                                x: (x * SIZE) + SIZE/2,
                                y: (y * SIZE) + SIZE/2,
                                isStatic: true,
                            }))
                            break;
                    }
                }
            )
        )
    )
}
