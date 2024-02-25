import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CommunityCreateInput) {
    return await this.prisma.community.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.community.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} community`;
  }

  async update(id: number, data: Prisma.CommunityUpdateInput) {
    return await this.prisma.community.update({
      where: {
        id: id,
      },
      data,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} community`;
  }
}
