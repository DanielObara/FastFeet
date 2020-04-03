import { Op } from 'sequelize';
import {
  isAfter,
  isBefore,
  parseISO,
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
    const { page = 1 } = req.query;
    const LIMIT = 2;

    const { rows: deliveries } = await Delivery.findAndCountAll({
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
      where: {
        deliveryman_id,
        canceled_at: null,
        end_date: {
          [Op.not]: null
        }
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

  async update(req, res) {
    const { id } = req.params;
    if (
      !(await Deliveryman.findOne({
        where: { id }
      }))
    )
      res.status(400).json({ error: 'Deliveryman does not exists' });

    const { start_date, end_date } = req.body;

    const initialDate = parseISO(start_date);
    const finalDate = parseISO(end_date);

    if (start_date && isBefore(initialDate, new Date()))
      res.status(400).json({ error: 'Past dates are not allowed !' });

    if (end_date && isBefore(finalDate, initialDate))
      res
        .status(400)
        .json({ error: 'Delivery date must be after the withdrawal date' });

    const initialHour = setSeconds(setMinutes(setHours(initialDate, 8), 0), 0);
    const finalHour = setSeconds(setMinutes(setHours(initialDate, 18), 0), 0);

    if (isAfter(initialDate, finalHour) || isBefore(initialDate, initialHour))
      res
        .status(400)
        .json({ error: 'Orders pickup only between 08:00AM and 18:00PM' });

    const { count: numbersOfDeliveries } = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: id,
        start_date: {
          [Op.between]: [startOfDay(initialDate), endOfDay(initialDate)]
        }
      }
    });

    if (numbersOfDeliveries >= 5)
      res.status(400).json({ error: 'maximum deliveries reached' });

    const UpdatedDelivery = await Delivery.findOne({
      where: {
        deliveryman_id: id
      }
    });

    if (UpdatedDelivery.start_date !== null && start_date) {
      UpdatedDelivery.start_date = initialDate;
      await UpdatedDelivery.update();
    } else {
      res
        .status(400)
        .json({ error: "You can't withdraw a this delivery again" });
    }

    return res.json(UpdatedDelivery);
  }
}

export default new DeliveryDashboardController();
