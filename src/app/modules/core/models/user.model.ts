// export interface UserLoginData {
//   username: string;
//   password: string;
// }

export type UserLoginData = Record<'username' | 'password', string>;
//   username: string;
//   password: string;
// }

export interface GetUserResponse extends UserLoginData {
  id: number;
  email: string;
}

export type PostUserResponse = GetUserResponse;

export type PostUser = Omit<GetUserResponse, 'id'>;

export class User {
  constructor(
    public email: string,
    public username: string,
  ) {}
}
