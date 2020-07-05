import { Op } from 'sequelize';
import {
  isAfter,
  isBefore,
  setSeconds,
  setMinutes,
  setHours,
  startOfDay,
  endOfDay
} from 'date-fns';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliveryDashboardController {
  async index(req, res) {
    const { id: deliveryman_id } = req.params;
    const isDone = req.query.isDone === 'true';

    const { page = 1 } = req.query;
    const LIMIT = 20;

    const deliveries = await Delivery.findAndCountAll({
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
      where: {
        deliveryman_id,
        canceled_at: null,
        signature_id: isDone ? { [Op.ne]: null } : null
      },
      order: [['id', 'DESC']],
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

    return res.json(deliveries);
  }

  async show(req, res) {
    const { deliveryId: id, id: deliveryman_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman)
      res.status(400).json({ error: 'Deliveryman does not exists' });

    const delivery = await Delivery.findOne({
      where: {
        id,
        deliveryman_id
      }
    });

    if (!delivery) res.status(400).json({ error: 'Delivery does not exists' });

    return res.json(delivery);
  }

  async update(req, res) {
    const { id: deliveryman_id, deliveryId } = req.params;

    const deliveryman = await Deliveryman.findOne({
      where: { id: deliveryman_id }
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const initialDate = new Date();
    const initialHour = setSeconds(setMinutes(setHours(initialDate, 8), 0), 0);
    const finalHour = setSeconds(setMinutes(setHours(initialDate, 18), 0), 0);

    if (isAfter(initialDate, finalHour) || isBefore(initialDate, initialHour)) {
      return res
        .status(400)
        .json({ error: 'Orders pickup only between 08:00AM and 18:00PM' });
    }

    const { count: numbersOfDeliveries } = await Delivery.findAndCountAll({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(initialDate), endOfDay(initialDate)]
        }
      }
    });

    if (numbersOfDeliveries >= 5) {
      return res.status(400).json({ error: 'Maximum deliveries reached' });
    }

    const UpdatedDelivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        deliveryman_id
      }
    });

    if (!UpdatedDelivery)
      res.status(400).json({ error: 'Delivery does not exists' });

    await UpdatedDelivery.update({
      start_date: initialDate
    });

    return res.status(200).json(UpdatedDelivery);
  }
}

export default new DeliveryDashboardController();
