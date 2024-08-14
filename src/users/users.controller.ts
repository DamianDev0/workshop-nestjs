import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Delete,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Method to create a new user in the database
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() newUser: CreateUserDto) {
    try {
      const user = await this.usersService.create(newUser);
      return {
        status: HttpStatus.CREATED,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      throw new NotFoundException('Error creating user');
    }
  }

  // Method to get all users from the database
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllUsers() {
    try {
      const users = await this.usersService.findAll();
      return {
        status: HttpStatus.OK,
        message: 'Users retrieved successfully',
        data: users,
      };
    } catch (error) {
      throw new NotFoundException('Error retrieving users');
    }
  }

  // Method to find user by ID
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      status: HttpStatus.OK,
      message: 'User retrieved successfully',
      data: user,
    };
  }

  // Method to delete user
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersService.delete(id);
    return;
  }

  // Method to update user
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    const existingUser = await this.usersService.findOne(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersService.update(id, user);
    return {
      status: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }
}
