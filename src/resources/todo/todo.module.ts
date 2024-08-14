import { MulterModule } from '@nestjs/platform-express';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    MulterModule.register({
      dest: '../upload',
    }),
    PrismaModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
