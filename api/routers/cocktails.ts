import express from 'express';
import auth, { RequestWithUser } from '../midldleware/auth';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import Cocktail from '../models/Cocktail';
import permit from '../midldleware/permit';
import { ICocktail } from '../types';

const cocktailRouter = express.Router();

cocktailRouter.get('/', async (req, res) => {
  try {
    const cocktails = await Cocktail.find();
    res.send(cocktails);
  } catch (e) {
    return res.send(500);
  }
});

cocktailRouter.get('/secret', auth, async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;
    const userCocktails = await Cocktail.find({ user: user._id });

    if (!userCocktails) {
      return res.sendStatus(404);
    }

    res.send(userCocktails);
  } catch (e) {
    return res.sendStatus(500);
  }
});

cocktailRouter.get('/:id', async (req, res) => {
  try {
    const result = await Cocktail.findById(req.params.id);
    if (!result) {
      return res.sendStatus(404);
    }
    return res.send(result);
  } catch {
    return res.sendStatus(500);
  }
});

cocktailRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    const cocktailData: ICocktail = {
      user: user._id,
      name: req.body.name,
      recipe: req.body.recipe,
      isPublished: req.body.isPublished,
      ingredients: req.body.ingredients,
      image: req.file ? req.file.filename : null,
    };

    const cocktail = new Cocktail(cocktailData);
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
