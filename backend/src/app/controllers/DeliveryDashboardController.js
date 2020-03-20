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
    const { deliveryman_id } = req.params;
    const { end_date = null, start_date = null } = req.body;
    const { page = 1 } = req.query;
    const LIMIT = 2;

    const { rows: deliveries, count } = await Delivery.findAndCountAll({
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
      where: {
        deliveryman_id,
        end_date: end_date || null,
        start_date: start_date || null,
        canceled_at: null
      },
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

    const {
      count: numbersOfDeliveries,
      rows: data
    } = await Delivery.findAndCountAll({
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

    if (start_date) {
      UpdatedDelivery.start_date = initialDate;
      await UpdatedDelivery.update();
    } else {
      UpdatedDelivery.end_date = finalDate;
      await UpdatedDelivery.update();
    }

    return res.json(UpdatedDelivery);
  }
}

export default new DeliveryDashboardController();
