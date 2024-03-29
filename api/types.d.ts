import mongoose from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  avatar: string | null;
  email: string;
}

export interface ICocktail {
  user: mongoose.Types.ObjectId;
  name: string;
  recipe: string;
  isPublished: boolean;
  image: string | null;
  ingredients: [
    {
      name: string;
      quantity: string;
    },
  ];
}
