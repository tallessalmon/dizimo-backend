import { Injectable } from '@nestjs/common';
import { Offertory, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OffertoryService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.OffertoryCreateInput): Promise<Offertory> {
    const result = await this.prisma.offertory.create({
      data,
    });
    return result;
  }

  async findAll(date: any) {
    try {
      const start: Date | null = date.initialDate ? new Date(date.initialDate) : null;
      const end: Date | null = date.finalDate ? new Date(date.finalDate) : null;
  
      if (start && end && start <= end) { 
        const result = await this.prisma.offertory.findMany({
          where: {
            date: {
              gte: start,
              lte: end,
            },
          },
          orderBy: {
            date: 'asc', 
          },
        });
        return result;
      } else {
        const result = await this.prisma.offertory.findMany({
          orderBy: {
            date: 'asc', 
          },
        });
        return result;
      }
    } catch (error) {
      throw new Error('Erro ao buscar offertory.'); 
    }
  }


  async findOne(id: number) {
    const result = await this.prisma.offertory.findUnique({
      where: {
        id: id,
      },
    });
    return result;
  }

  update(id: number, data: Prisma.OffertoryUpdateInput): Promise<Offertory> {
    return this.prisma.offertory.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    const result = await this.prisma.offertory.delete({
      where: {
        id: id,
      },
    });
    return result;
  }
}
