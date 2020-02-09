import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();

    if (!recipients.length > 0) {
      return res.status(400).json({ msg: "Don't have any data" });
    }

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

    return res.json({ msg: 'Recipient successfully deleted' });
  }
}

export default new RecipientController();
