import express from 'express';
import auth from '../midldleware/auth';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import { ICocktail } from '../types';
import Cocktail from '../models/Cocktail';
import permit from '../midldleware/permit';

const cocktailRouter = express.Router();

cocktailRouter.get('/', async (req, res) => {
  try {
    const userQuery = req.query.user;

    let query = Cocktail.find();

    if (userQuery) {
      query = query.where('artist', userQuery);
    }

    query = query.populate('user', 'name');

    const results = await query;

    res.send(results);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

cocktailRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const productData: ICocktail = {
      user: req.body.user,
      name: req.body.name,
      recipe: req.body.recipe,
      isPublished: req.body.isPublished,
      ingredients: req.body.ingredients,
      image: req.file ? req.file.filename : null,
    };

    const cocktail = new Cocktail(productData);
    await cocktail.save();

    return res.send(cocktail);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

cocktailRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  try {
    const id = req.params.id;
    const cocktail = await Cocktail.findById(id);

    if (!cocktail) {
      return res.status(404).send('Not found');
    }

    cocktail.isPublished = !cocktail.isPublished;
    await cocktail.save();

    return res.status(200).send({ message: 'Status toggled successfully', cocktail });
  } catch (error) {
    return res.status(500).send(error);
  }
});

cocktailRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const id = req.params.id;
    const cocktail = await Cocktail.findById(id);

    if (!cocktail) {
      return res.status(404).send('Not Found');
    }

    await Cocktail.findByIdAndRemove(id);

    return res.send('Deleted');
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default cocktailRouter;
