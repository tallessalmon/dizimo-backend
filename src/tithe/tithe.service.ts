import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Tithe } from '@prisma/client';

@Injectable()
export class TitheService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TitheCreateInput): Promise<Tithe> {
    const result = await this.prisma.tithe.create({
      data,
    });
    return result;
  }

  findAll() {
    return `This action returns all tithe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tithe`;
  }

  update(id: number, data: Prisma.TitheUpdateInput): Promise<Tithe> {
    return this.prisma.tithe.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} tithe`;
  }
}
