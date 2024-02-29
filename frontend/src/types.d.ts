
export interface IPosts {
  _id: string;
  title: string;
  description: string;
  datetime: string,
  image?: string | null;
  user?: string,
}

export interface IPostForAdd {
  title: string;
  description: string;
  image?: string | null;
}


export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}
