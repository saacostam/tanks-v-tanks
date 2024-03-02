import { LevelTile } from ".";

export type GenerateLevelOptions = {
    nHorizontalTiles: number;
    nVerticalTiles: number;
    tileSize: number;
}

export function generateLevel({
    nHorizontalTiles,
    nVerticalTiles,
}: GenerateLevelOptions): LevelTile[][]{
    const level: LevelTile[][] = [];

    for (let y = 0; y < nVerticalTiles; y++){
        const row: LevelTile[] = [];
        
        for (let x = 0; x < nHorizontalTiles; x++){
            let level: LevelTile | undefined;

            if (
                (x === 0 || x === nHorizontalTiles - 1) 
                || (y === 0 || y === nVerticalTiles - 1)
                || (x === 6 && y > nVerticalTiles/4)
                || (x === 12 && y < nVerticalTiles*3/4)
                || (x === 18 && y > nVerticalTiles/4)
                || (x === 25 && y < nVerticalTiles*3/4)
            ){
                level = {
                    type: 'static',
                }
            }else{
                level = {
                    type: 'empty',
                }
            }

            row.push(level);
        }

        level.push(row);
    }

    return level;
}
