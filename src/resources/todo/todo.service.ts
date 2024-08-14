/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpException, HttpStatus, Get } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Todo } from '@prisma/client';
import { UpdateTodoDto } from './dto/update';
import { CreateTodoDto } from './dto/create';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTodoDto): Promise<Todo> {
    return await this.prisma.todo.create({
      data,
    });
  }

  async GetAll(skip: number, limit: number): Promise<Todo[]> {
    return await this.prisma.todo.findMany({
      orderBy: { updatedAt: 'asc' },
      skip: Number(skip) || 0,
      take: Number(limit) || 10,
    });
  }

  async GetOne(id: string): Promise<Todo> {
    return await this.prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
  }

  async Update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    // try {
    await this.prisma.todo.update({
      where: {
        id,
      },
      data: updateTodoDto,
    });
    throw new HttpException({ message: 'Update Success' }, HttpStatus.OK);
    // } catch (err) {
    //   throw new HttpException(err, HttpStatus.BAD_REQUEST);
    // }
  }

  async Delete(id: string): Promise<any> {
    const response = await this.prisma.todo.findFirst({
      where: {
        id,
      },
    });
    if (response) {
      throw new HttpException({ message: 'Remove Success' }, HttpStatus.GONE);
    } else {
      throw new HttpException({ message: 'Remove Success' }, HttpStatus.GONE);
    }
  }
}
