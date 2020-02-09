import User from '../models/User';

// import { storeSchema, updateSchema } from '../middlewares/validators/User';

class UserController {
  async index(req, res) {
    const user = await User.findAll();

    return res.json(user);
  }

  async store(req, res) {
    // try {
    //   await storeSchema.validate(req.body);
    // } catch (err) {
    //   return res.status(400).json({ error:'Validation fails'});
    // }

    const { email } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already registered.' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();
