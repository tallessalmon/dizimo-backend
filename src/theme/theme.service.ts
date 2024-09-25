import { Injectable, UseGuards } from '@nestjs/common';
import { Prisma, Theme } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ThemeService {
  constructor(private prisma: PrismaService) { }

  @UseGuards(AuthGuard)
  async create(data: Prisma.ThemeCreateInput): Promise<Theme> {
    return await this.prisma.theme.create({
      data
    })
  }

  async findAll() {
    return await this.prisma.theme.findMany({
      orderBy: {
        id: 'desc'
      },
      take: 1
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} theme`;
  // }

  // update(id: number, updateThemeDto: Prisma.ThemeUpdateInput) {
  //   return `This action updates a #${id} theme`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} theme`;
  // }
}
