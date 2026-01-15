import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Example } from '../../models';
import { CreateExampleDto } from './dto/create-example.dto';

@Injectable()
export class ExampleService {
  constructor(
    @InjectModel(Example.name) private exampleModel: Model<Example>,
  ) {}

  async create(createExampleDto: CreateExampleDto): Promise<Example> {
    const createdExample = new this.exampleModel(createExampleDto);
    return createdExample.save();
  }

  async findAll(): Promise<Example[]> {
    return this.exampleModel.find().exec();
  }

  async findOne(id: string): Promise<Example | null> {
    return this.exampleModel.findById(id).exec();
  }
}

