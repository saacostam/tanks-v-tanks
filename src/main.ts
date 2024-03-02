import { Color, DisplayMode, Engine, Loader } from 'excalibur'

import { Tank } from './actors';
import { HEIGHT, N_HORIZONTAL_TILES, N_VERTICAL_TILES, SIZE, WIDTH } from './constants';
import { addLevelToEngine, generateLevel } from './level';
import { brickImage, tankImage } from './resources';

import './style.css'

const game = new Engine({
    width: WIDTH,
    height: HEIGHT,
    antialiasing: true,
    suppressPlayButton: true,
    displayMode: DisplayMode.FitScreen,
})

const level = generateLevel({
    nHorizontalTiles: N_HORIZONTAL_TILES,
    nVerticalTiles: N_VERTICAL_TILES,
    tileSize: SIZE,
})

addLevelToEngine(game, level);

game.add(new Tank({
    x: SIZE * 3,
    y: HEIGHT - (SIZE * 3),
    color: Color.DarkGray,
}));

game.start(new Loader([
    brickImage,
    tankImage,
]));
