/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Get,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TodoService } from './todo.service';
import { Todo } from '@prisma/client';
import { CreateTodoDto } from './dto/create';
import { UpdateTodoDto } from './dto/update';
import { Response } from 'express';
import { join } from 'path';
import { CreateUploadFile } from '../../images/upload';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('todo')
  create(@Body() createUserDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createUserDto);
  }

  @Patch('todo/:id')
  async Update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return await this.todoService.Update(id, updateTodoDto);
  }

  @Get('todos/')
  async GetAll(@Param() limit: number, @Param() skip: number): Promise<Todo[]> {
    return await this.todoService.GetAll(skip, limit);
  }

  @Get('todo/:id')
  async GetOne(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.GetOne(id);
  }

  @Delete('todo/:id')
  async Delete(@Param('id') id: string): Promise<object> {
    console.log(id);
    return await this.todoService.Delete(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async UploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    await CreateUploadFile(file);
  }

  @Get('getImage/:imageName')
  GetImages(@Param() params: any, @Res() res: Response) {
    const { imageName } = params;
    res.sendFile(join(__dirname, `../../../images/${imageName}`), (err) => {
      if (err) {
        console.error('Error sending file');
        res.status(HttpStatus.NOT_FOUND).send('not found');
      }
    });
  }
}
