import { User } from 'src/user/user.types';

export interface Alert {
  id: number;
  name: string;
  age: number;
  file?: string;
  note?: string;
  userId: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type CreateAlertDto = Pick<
  Alert,
  'name' | 'age' | 'file' | 'note' | 'userId'
>;

export type GetAllAlertsResponse = Omit<Alert, 'userId'> & {
  user?: User;
};
