import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from '../config/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: AppConfigService) => ({
        uri: configService.mongodbUri,
        retryWrites: true,
        w: 'majority',
      }),
      inject: [AppConfigService],
    }),
  ],
})
export class DatabaseModule {}

