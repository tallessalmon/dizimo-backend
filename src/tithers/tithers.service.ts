import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Tithers } from '@prisma/client';

@Injectable()
export class TithersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TithersCreateInput): Promise<Tithers> {
    const result = await this.prisma.tithers.create({
      data,
    });
    return result;
  }

  async findAll() {
    const result = await this.prisma.tithers.findMany({});
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.tithers.findUnique({
      where: {
        id: id,
      },
    });
    return result;
  }

  update(id: number, data: Prisma.TithersUpdateInput): Promise<Tithers> {
    return this.prisma.tithers.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    const result = await this.prisma.tithers.delete({
      where: {
        id: id,
      },
    });
    return result;
  }
}
