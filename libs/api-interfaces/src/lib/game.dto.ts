import { ArrayMaxSize, ArrayMinSize, IsArray, IsMongoId, IsString, Length } from 'class-validator';

export const nChars = 9;

export class NewGameDto {
    @IsArray()
    @ArrayMinSize(nChars)
    @ArrayMaxSize(nChars)
    @IsString({ each: true })
    @Length(1, 1, { each: true })
    characters: string[];
}

export class GameIdDto {
    @IsMongoId()
    _id: string;
}

export class CorrectWordDto {
    @IsString()
    word: string;

    // points are computed server-side; no validation needed for responses
    points: number;
}

class GameDto extends GameIdDto {
    @IsArray()
    @ArrayMinSize(nChars)
    @ArrayMaxSize(nChars)
    @IsString({ each: true })
    @Length(1, 1, { each: true })
    characters: string[];

    totalScore: number;
}

/** Lightweight game data for lists (best/last). */
export class GameListItemDto extends GameDto {
    wordsCount: number;
}

/** Full game state used to resume a game. */
export class GameDetailDto extends GameDto {
    words: CorrectWordDto[];
}
