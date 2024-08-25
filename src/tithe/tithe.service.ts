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

  async findAll(date: {initialDate?: string, finalDate?: string}) {
    const dateNow = new Date()
    const start: Date | null = date.initialDate ? new Date(date.initialDate) : null;
    const end: Date | null = date.finalDate ? new Date(date.finalDate) : null;

    if (start && end && start <= end) { 
      const result = await this.prisma.tithe.findMany({
        where: {
          date: {
            gte: start,
            lte: end,
          },
        },
        orderBy: {
          date: 'asc', 
        },
        include: {
          tither : {
            select: {
              fullName: true
            }
          }
        }
      });
      return result;
    } else {
      const result = await this.prisma.tithe.findMany({
        where: {
          date: {
            gte: new Date(`${dateNow.getFullYear()}-01-01 00:00:00`)        }
        },
        orderBy: {
          date: 'asc', 
        },
      });
      return result;
    }
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
