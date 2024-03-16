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
