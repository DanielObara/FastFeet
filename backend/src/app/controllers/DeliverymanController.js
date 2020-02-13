import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const deliverymen = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url']
        }
      ]
    });
    return res.json(deliverymen);
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
    console.log('TCL: DeliverymanController -> update -> email', email);

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({
        where: { email: email }
      });

      if (await Deliveryman.findOne({ where: { email } }))
        res.status(400).json({ error: 'Deliveryman already exists' });
    }

    const { id, name, avatar_id } = await deliveryman.update(req.body);

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

    await Deliveryman.destroy(id);

    return res.status(200).json({ msg: 'Deliveryman successfully deleted' });
  }
}

export default new DeliverymanController();
