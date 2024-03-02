import { Color } from "excalibur"

export type EmptyLevelTile = {}

export type StaticLevelTile = {
    color?: Color;
}

export type LevelTile = {
    type: 'empty'
} & EmptyLevelTile | {
    type : 'static'
} & StaticLevelTile;

