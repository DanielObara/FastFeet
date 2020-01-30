import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async index(req, res) {
    const user = await User.findAll();

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
