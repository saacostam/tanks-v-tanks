import { Color, DisplayMode, Engine } from 'excalibur'

import { Tank } from './actors';
import { HEIGHT, N_HORIZONTAL_TILES, N_VERTICAL_TILES, SIZE, WIDTH } from './constants';

import './style.css'
import { addLevelToEngine, generateLevel } from './level';

const game = new Engine({
    width: WIDTH,
    height: HEIGHT,
    displayMode: DisplayMode.FitScreen,
})

const level = generateLevel({
    nHorizontalTiles: N_HORIZONTAL_TILES,
    nVerticalTiles: N_VERTICAL_TILES,
    tileSize: SIZE,
})

addLevelToEngine(game, level);

game.add(new Tank({
    x: WIDTH/2,
    y: HEIGHT/2,
    color: Color.Rose,
}));

game.start();
