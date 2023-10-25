import { Module } from '@nestjs/common';
import { ActsService } from './acts.service';
import { ActsController } from './acts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ActSchema } from './schemas/act.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Act', schema: ActSchema }])],
  controllers: [ActsController],
  providers: [ActsService],
})
export class ActsModule {}
