import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page = 1, name = '' } = req.query;
    const LIMIT = 20;
    const deliveryman = await Deliveryman.findAndCountAll({
      where: {
        name: { [Op.iLike]: `%${name}%` }
      },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url']
        }
      ],
      order: ['id'],
      limit: LIMIT,
      offset: (page - 1) * LIMIT
    });
    return res.json(deliveryman);
  }

  async show(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) res.status(400).json({ error: 'Recipient not found' });

    return res.json(deliveryman);
  }

  async store(req, res) {
    const { email } = req.body;

    if (await Deliveryman.findOne({ where: { email } }))
      res.status(400).json({ error: 'Deliveryman already exists' });

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  async update(req, res) {
    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (email && email !== deliveryman.email) {
      if (await Deliveryman.findOne({ where: { email } }))
        res.status(400).json({ error: 'Deliveryman already exists' });
    }

    const { id, name, avatar_id } = await Deliveryman.findOne({
      where: { email }
    }).update(req.body);

    return res.status(200).json({
      id,
      name,
      email,
      avatar_id
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(id);

    if (!deliverymanExists)
      res.status(400).json({ error: 'Deliveryman not exists' });

    await deliverymanExists.destroy(id);

    return res.status(200).json({ msg: 'Deliveryman successfully deleted' });
  }
}

export default new DeliverymanController();
