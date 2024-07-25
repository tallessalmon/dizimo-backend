import { Injectable } from '@nestjs/common';
import { Bank, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BanksService {
  constructor(private prisma: PrismaService) { }
  async create(data: Prisma.BankCreateInput): Promise<Bank> {
    const result = await this.prisma.bank.create({
      data
    });
    return result;
  }

  async findAll() {
    return await this.prisma.bank.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.bank.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, data: Prisma.BankUpdateInput): Promise<Bank> {
    return this.prisma.bank.update({
      where: {
        id,
      },
      data
    });
  }
}
