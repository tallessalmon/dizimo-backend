import { Injectable } from '@nestjs/common';
import { CreateTitheDto } from './dto/create-tithe.dto';
import { UpdateTitheDto } from './dto/update-tithe.dto';

@Injectable()
export class TitheService {
  create(createTitheDto: CreateTitheDto) {
    return 'This action adds a new tithe';
  }

  findAll() {
    return `This action returns all tithe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tithe`;
  }

  update(id: number, updateTitheDto: UpdateTitheDto) {
    return `This action updates a #${id} tithe`;
  }

  remove(id: number) {
    return `This action removes a #${id} tithe`;
  }
}
