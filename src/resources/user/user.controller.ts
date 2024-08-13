import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { findUserDto } from './dto/find-user.dto';
import { User } from '@prisma/client';
import { Query } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // this api is for create user
  @Post('create')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  // this api is for find all user
  @Get('findall/')
  async findAll(@Query() searchString: findUserDto): Promise<User[]> {
    return await this.userService.findAll({
      where: {
        ...searchString,
      },
    });
  }

  // this api is for find all user with take and skip example: localhost:3000/user/findall/search/0/0
  @Get('findall/search/:take/:skip')
  async findAllLimit(
    @Body() searchString: findUserDto,
    @Param('take') take: number,
    @Param('skip') skip: number,
  ): Promise<User[]> {
    return await this.userService.findAll({
      where: {
        ...searchString,
      },
      take,
      skip,
    });
  }

  // this api is for find one user with id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  // this api is for update user
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  // this api is for delete user
  @Delete('delete/:id')
  async remove(@Param('id') id: string): Promise<User> {
    return await this.userService.remove(id);
  }
}
