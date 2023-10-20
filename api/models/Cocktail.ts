import mongoose from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  quantity: {
    required: true,
    type: String,
  },
});

const RatingSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
      message: 'User does not exist!',
    },
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const CocktailSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
      message: 'User does not exist!',
    },
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  ingredients: {
    required: true,
    type: [IngredientSchema],
  },
  ratings: {
    required: true,
    type: [RatingSchema],
  },
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;
