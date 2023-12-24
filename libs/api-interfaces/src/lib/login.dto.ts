import { IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}

export class LoginResponseDto {
    access_token: string;
}
