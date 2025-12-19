import { ArrayMaxSize, ArrayMinSize, IsArray, IsString, Length } from 'class-validator';

export const nChars = 9;

export class GameDto {
    @IsArray()
    @ArrayMinSize(nChars)
    @ArrayMaxSize(nChars)
    @IsString({ each: true })
    @Length(1, 1, { each: true })
    characters: string[];
}

export class GameIdDto {
    @IsString()
    @Length(24, 24)
    _id: string;
}

export class CorrectWordDto {
    @IsString()
    word: string;

    // points are computed server-side; no validation needed for responses
    points: number;
}

/** Lightweight game data for lists (best/last). */
export class GameListItemDto extends GameIdDto {
    @IsArray()
    @ArrayMinSize(nChars)
    @ArrayMaxSize(nChars)
    @IsString({ each: true })
    @Length(1, 1, { each: true })
    characters: string[];

    totalScore: number;

    wordsCount: number;
}

/** Full game state used to resume a game. */
export class GameDetailDto extends GameIdDto {
    @IsArray()
    @ArrayMinSize(nChars)
    @ArrayMaxSize(nChars)
    @IsString({ each: true })
    @Length(1, 1, { each: true })
    characters: string[];

    words: CorrectWordDto[];

    totalScore: number;
}
