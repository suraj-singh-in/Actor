import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Post,
} from '@nestjs/common';
import { ActsService } from './acts.service';
import { CreateActDto } from './dto/create-act.dto';
import { UpdateActDto } from './dto/update-act.dto';
import { Act } from './schemas/act.schema';

@Controller('acts')
export class ActsController {
  constructor(private readonly actsService: ActsService) {}

  @Get()
  async findAll(): Promise<Act[]> {
    return await this.actsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Act> {
    return await this.actsService.findOne(id);
  }

  @Post()
  async create(@Body() post: Act): Promise<Act> {
    return await this.actsService.create(post);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() post: Act): Promise<Act> {
    return await this.actsService.update(id, post);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Act> {
    return await this.actsService.delete(id);
  }
}
