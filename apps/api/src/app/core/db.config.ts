import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
}));
