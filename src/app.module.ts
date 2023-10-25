// Libs
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';
import { ActsModule } from './acts/acts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', { dbName: 'actor' }),
    ActsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
