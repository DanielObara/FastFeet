import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Mail from '../../lib/Mail';

class DeliveryController {
  async index(req, res) {
    const { page = 1, product = '' } = req.query;
    const LIMIT = 20;
    const { rows: deliveries, count } = await Delivery.findAndCountAll({
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
      where: { product: { [Op.iLike]: `%${product}%` } },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email', 'avatar_id'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url']
          }
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'zip_code',
            'number',
            'state',
            'city',
            'complement'
          ]
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'path', 'name']
        }
      ],
      attributes: [
        'id',
        'product',
        'deliveryman_id',
        'recipient_id',
        'canceled_at',
        'start_date',
        'end_date'
      ]
    });
    return res.set({ total_pages: Math.ceil(count / LIMIT) }).json(deliveries);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryExists = await Delivery.findByPk(id);

    return res.status(200).json(deliveryExists);
  }

  async store(req, res) {
    const { deliveryman_id, recipient_id, product } = req.body;

    const checkDeliverymanExists = await Deliveryman.findOne({
      where: { id: deliveryman_id }
    });

    const checkRecipientExists = await Recipient.findOne({
      where: { id: recipient_id }
    });

    if (!(checkDeliverymanExists && checkRecipientExists))
      res
        .status(400)
        .json({ error: 'Deliveryman and Recipient does not exists' });

    if (!checkRecipientExists)
      res.status(400).json({ error: 'Recipient does not exists' });

    if (!checkDeliverymanExists)
      res.status(400).json({ error: 'Deliveryman does not exists' });

    const delivery = await Delivery.create({
      product,
      deliveryman_id,
      recipient_id
    });

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    const recipient = await Recipient.findByPk(recipient_id);

    // await Queue.add(DetailMail.key, {
    //   delivery,
    //   deliveryman,
    //   recipient
    // });

    await Mail.sendMail({
      to: `${delivery.name} <${deliveryman.email}`,
      subject: 'New delivery was asigned to you!',
      text: 'You have a new delivery to do!'
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const { deliveryman_id, recipient_id } = req.body;

    const checkDeliverymanExists = await Deliveryman.findOne({
      where: { id: deliveryman_id }
    });

    const checkRecipientExists = await Recipient.findOne({
      where: { id: recipient_id }
    });

    if (!(checkDeliverymanExists && checkRecipientExists)) {
      return res
        .status(400)
        .json({ error: 'Deliveryman and Recipient does not exists' });
    }

    if (!checkRecipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    if (!checkDeliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    const { id, product } = await delivery.update(req.body);

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryExists = await Delivery.findByPk(id);

    if (!deliveryExists) res.status(400).json({ error: 'Delivery not exists' });

    await deliveryExists.destroy({ where: { id } });

    return res.status(200).json({ msg: 'Delivery was successfully deleted' });
  }
}

export default new DeliveryController();
