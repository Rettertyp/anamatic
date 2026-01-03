import { IsArray, IsString } from 'class-validator';

export class BatchWordCheckDto {
    @IsArray()
    @IsString({ each: true })
    words!: string[];
}

export type BatchWordCheckResponseDto = Array<{
    word: string;
    answer: {
        wordExists: boolean;
        points?: number;
    };
}>;
