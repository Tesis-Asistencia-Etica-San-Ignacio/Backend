import { Type, Static } from '@sinclair/typebox';

export const UserTypeEnum = Type.Union([
  Type.Literal('EVALUADOR'),
  Type.Literal('INVESTIGADOR'),
]);

export const CreateUserSchema = Type.Object({
  name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  password: Type.String(),
  type: UserTypeEnum,
});
export type CreateUserDto = Static<typeof CreateUserSchema>;


export const UpdateUserSchema = Type.Partial(CreateUserSchema);
export type UpdateUserDto = Static<typeof UpdateUserSchema>;


export const UserResponseSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  type: UserTypeEnum,
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});
export type UserResponseDto = Static<typeof UserResponseSchema>;

// Esquema para una lista de usuarios
export const UsersListSchema = Type.Object({
  users: Type.Array(UserResponseSchema),
});
export type UsersListDto = Static<typeof UsersListSchema>;
