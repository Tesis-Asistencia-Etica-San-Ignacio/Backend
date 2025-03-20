export type UserType = 'EVALUADOR' | 'INVESTIGADOR';

export interface BaseUser {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export type User = BaseUser;
