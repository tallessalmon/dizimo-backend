import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import  bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const result = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return result;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    const passwOld = await this.findOne(id);
    const hashedPassword = await bcrypt.hash(data.password, 12);
    if (data.password !== passwOld.password) {
      return this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...data,
          password: hashedPassword,
        },
      });
    } else {
      return this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...data,
          password: undefined,
        },
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
