interface ILoginResponse {
  access_token: string;
  user: {
    _id: string;
    roles: Array<string>;
    emailVerified: boolean;
    email: string;
    username: string;
  };
}

interface IUserResponse {
  _id: string;
  roles: Array<string>;
  emailVerified: boolean;
  email: string;
  username: string;
}

export type { ILoginResponse, IUserResponse };
