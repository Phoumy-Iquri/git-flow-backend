import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { findUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const res = await this.prisma.user.create({
      data,
    });
    return res;
  }

  async findAll(params: {
    where?: Prisma.UserWhereInput;
    skip?: number;
    take?: number;
  }): Promise<User[]> {
    const { where, skip, take } = params;

    const data = await this.prisma.user.findMany({
      where,
      skip: Number(skip) || 0,
      take: Number(take) || 10,
    });
    return data;
  }

  async findOne(_id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id: _id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
