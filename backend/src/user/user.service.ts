import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserDto,
  GetAllUsersResponse,
  User,
  UserWithoutPassword,
} from './user.types';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.create({ data });
    return this.toPublicUser(user);
  }

  async getAllUsers(): Promise<GetAllUsersResponse[]> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        alerts: true,
      },
    });
  }

  async getUserById(id: number, includeAlerts: boolean = false) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { alerts: includeAlerts },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.toPublicUser(user);
  }

  async deleteUser(id: number): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.delete({ where: { id } });

    return this.toPublicUser(user);
  }

  private toPublicUser(user: User): UserWithoutPassword {
    const { password, ...publicUser } = user;
    return publicUser as UserWithoutPassword;
  }
}
