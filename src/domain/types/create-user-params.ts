import { UserModel } from "@domain/models/user";

export type CreateUserParams = Omit<
  UserModel,
  "id" | "createdAt" | "updatedAt" | "roles" | "sales" | "reservations"
>;
