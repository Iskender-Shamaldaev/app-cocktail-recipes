export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null;
  email: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
  email: string;
}

export interface Cocktail {
  _id: string;
  user: {
    name: string;
  };
  name: string;
  image: string | null;
  isPublished: boolean;
  recipe: string;
  ingredients: [
    {
      name: string;
      quantity: string;
    },
  ];
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
