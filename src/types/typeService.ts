export type ApiResponse = {
  status: number;
  message: string;
};

export type LoginResponse = ApiResponse & {
  access_token: string;
};

export type AccessResponse = ApiResponse & {
  data:UserResponse
}

export type UserRegister = {
  username: string;
  password: string;
  name: string;
  lastname: string;
  email: string;
  birthday: string;
  country: string;
};

export type UserLogin = {
  username: string;
  password: string;
};

export type UserResponse = {
  id: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  birthday: string;
  country: string;
  createdAt: string;
  lastSession: string;
};
