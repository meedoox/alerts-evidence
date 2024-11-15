import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.types';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }

  @Get()
  async getAllUsers(@Query('includeAlerts') includeAlerts: string) {
    return await this.userService.getAllUsers(includeAlerts === 'true');
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
    @Query('includeAlerts') includeAlerts: string,
  ) {
    return await this.userService.getUserById(
      Number(id),
      includeAlerts === 'true',
    );
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(Number(id));
  }
}
