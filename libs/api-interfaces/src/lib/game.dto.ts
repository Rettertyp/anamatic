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
