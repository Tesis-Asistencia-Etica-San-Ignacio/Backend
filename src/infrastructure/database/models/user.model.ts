// /src/infrastructure/database/models/user.model.ts
import { Schema, model, Document, Types } from "mongoose";

export type UserType = "EVALUADOR" | "INVESTIGADOR";

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  last_name: string;
  email: string;
  password: string;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: {
      type: String,
      enum: ["EVALUADOR", "INVESTIGADOR"],
      required: true,
    },
  },
  {
    timestamps: true, // crea createdAt, updatedAt
  }
);

export const User = model<UserDocument>("Usuarios", UserSchema);
