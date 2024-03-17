export type LoginFormType = {
  email: string;
  password: string;
};

export type RegisterFormType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatedPassword: string;
  displayName?: string;
  birthday: Date;
  company?: string;
  position?: string;
  address?: string;
};

export type UserFields = {
  id: number;
  name: string;
  email: string;
  displayName?: string;
  dateOfBirth?: Date;
  position?: string;
  organization?: string;
  createdAt: Date;
  role: string;
};
