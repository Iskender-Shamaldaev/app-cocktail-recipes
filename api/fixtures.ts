import mongoose from 'mongoose';
import crypto from 'crypto';
import config from './config';
import User from './models/User';
import Cocktail from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('cocktails');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user1, admin, user2] = await User.create(
    {
      username: 'user',
      password: '1qaz@WSX29',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'superUser',
      avatar: 'fixtures/user.jpeg',
      email: 'user@mail.com',
    },
    {
      username: 'admin',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      displayName: 'SuperAdmin',
      avatar: 'fixtures/admin.jpeg',
      email: 'admin@mail.com',
    },
    {
      username: 'alex',
      password: '1qaz@WSX29',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Alex',
      avatar: 'fixtures/alex.jpeg',
      email: 'user@mail.com',
    },
  );

  await Cocktail.create(
    {
      user: user1._id,
      name: 'Classic Daiquiri',
      recipe:
        "Daiquiris can get a bad rep for being fruity slushies that you only drink on the beach. But this Cuban rum cocktail was a favorite of some of America's biggest names — including President John F. Kennedy and Ernest Hemingway. Let the tasty simplicity of the Daiquiri change your mind with the sweet, fresh flavors of light rum, sugar, and lime.",
      image: 'fixtures/daiquiri.jpg',
      isPublished: false,
      ingredients: [
        {
          name: 'fluid ounces light rum',
          quantity: '13 ml',
        },
        {
          name: 'fluid ounce lime juice',
          quantity: '10 ml',
        },
        {
          name: 'cup ice cubes',
          quantity: '1',
        },
        {
          name: 'teaspoon white sugar',
          quantity: '1',
        },
        {
          name: 'lime wedge',
          quantity: '1',
        },
        {
          name: 'tablespoons white sugar, or as needed',
          quantity: '2',
        },
      ],
    },
    {
      user: admin._id,
      name: 'King of Blue',
      recipe:
        'Assembling this cocktail is fairly straightforward, and calls for a whip shake, which means adding one or two pieces of ice to the cocktail shaker, and shaking until they are fully diluted with the other ingredients. As for the concord grape syrup, we’d suggest drizzling a little on top of vanilla ice cream, or mixing it with seltzer for a sweet, rich riff on a shrub. –– Oset Babür-Winter',
      image: 'fixtures/king.jpg',
      isPublished: false,
      ingredients: [
        {
          name: 'teaspoon citric acid',
          quantity: '1',
        },
        {
          name: 'cup water',
          quantity: '1',
        },
        {
          name: ' cups sugar',
          quantity: '1/3',
        },
        {
          name: 'ounces frozen blueberries',
          quantity: '1/2',
        },
      ],
    },
    {
      user: admin._id,
      name: 'Manhattan',
      recipe:
        "The Manhattan has been famous since its alleged invention in the late 1800s in New York City's Manhattan Club. We may not know who invented the once-exclusive cocktail, but it's now a common cocktail served worldwide. The classic Manhattan is two parts whiskey, one part sweet vermouth, and bitters.",
      image: 'fixtures/manhattan.jpg',
      isPublished: false,
      ingredients: [
        {
          name: 'fluid ounces rye whiskey',
          quantity: '20 ml',
        },
        {
          name: ' fluid ounce sweet vermouth',
          quantity: '10 ml',
        },
        {
          name: 'dash Angostura bitters',
          quantity: '1',
        },
        {
          name: 'maraschino cherry',
          quantity: '1',
        },
        {
          name: 'cup ice cubes',
          quantity: '1',
        },
      ],
    },
    {
      user: user2._id,
      name: 'The Perfect Margarita',
      recipe:
        "The Margarita originated in Mexico, and it sparks a lot of debate about the way it's served. Whether you like it with or without a salt rim, frozen or on the rocks, or with triple sec, Cointreau, or Grand Marnier, you can't go wrong with a classic Margarita. The tequila is key, so opt for blanco tequila and start with the 3-2-1 ratio of three parts tequila, two parts orange-flavored liqueur, and one part lime juice.",
      image: 'fixtures/margarita.jpg',
      isPublished: false,
      ingredients: [
        {
          name: 'fluid ounces triple sec',
          quantity: '13 ml',
        },
        {
          name: 'large ice cube',
          quantity: '1',
        },
        {
          name: 'fluid ounces white tequila',
          quantity: '14 ml',
        },
        {
          name: 'fluid ounce freshly squeezed lime juice',
          quantity: '15 ml',
        },
        {
          name: 'slice lime',
          quantity: '1',
        },
      ],
    },
  );

  await db.close();
};

run().catch(console.error);
