import { Alert } from 'src/alert/alert.types';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type UserWithoutPassword = Omit<User, 'password'>;

export type GetAllUsersResponse = UserWithoutPassword & {
  alerts: Alert[];
};
