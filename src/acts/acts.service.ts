import { Injectable } from '@nestjs/common';
import { CreateActDto } from './dto/create-act.dto';
import { UpdateActDto } from './dto/update-act.dto';
import { Act } from './schemas/act.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ActsService {
  constructor(@InjectModel('Act') private readonly actModel: Model<Act>) {}

  async findAll(): Promise<Act[]> {
    return await this.actModel.find().exec();
  }

  async findOne(id: string): Promise<Act> {
    return await this.actModel.findById(id).exec();
  }

  async create(post: Act): Promise<Act> {
    const newPost = new this.actModel(post);
    return await newPost.save();
  }

  async update(id: string, post: Act): Promise<Act> {
    return await this.actModel.findByIdAndUpdate(id, post, { new: true });
  }

  async delete(id: string): Promise<Act> {
    return await this.actModel.findByIdAndRemove(id);
  }
}
