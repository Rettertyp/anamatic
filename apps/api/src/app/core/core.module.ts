import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigType } from '@nestjs/config';
import dbConfig from './db.config';

@Module({
    imports: [
        ConfigModule.forFeature(dbConfig),
        MongooseModule.forRootAsync({
            imports: [ConfigModule.forFeature(dbConfig)],
            useFactory: async (dbCfg: ConfigType<typeof dbConfig>) => ({
                uri: `mongodb+srv://${dbCfg.user}:${dbCfg.password}@${dbCfg.host}/${dbCfg.database}`,
            }),
            inject: [dbConfig.KEY],
        }),
    ],
})
export class CoreModule {}
