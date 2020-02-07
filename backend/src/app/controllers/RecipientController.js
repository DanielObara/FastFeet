import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { id } = req.query;

    if (id) {
      const recipientExists = await Recipient.findByPk(id);

      if (!recipientExists) {
        return res.status(400).json({ error: 'Recipient not found.' });
      }

      return res.json(recipientExists);
    }

    const recipients = await Recipient.findAll();

    return res.json(recipients);
  }

  async show(request, response) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required()
    });

    if (!(await schema.isValid(request.params)))
      return response.status(400).json({ error: 'Validation fails' });

    const recipient = await Recipient.findByPk(request.params.id);

    if (!recipient)
      return response.status(400).json({ error: 'Recipient not found' });

    return response.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.number(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name }
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.number(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const recipientExists = await Recipient.findByPk(id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    const recipient = await recipientExists.update(req.body);

    return res.json(recipient);
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipientExists = await Recipient.findByPk(id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    await recipientExists.destroy(id);

    return res.json();
  }
}

export default new RecipientController();
