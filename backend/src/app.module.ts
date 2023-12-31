import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), 
        dbName: 'Game',
        useNewUrlParser: true, useUnifiedTopology: false 
      }),
      inject: [ ConfigService ],
    }),
    GameModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
