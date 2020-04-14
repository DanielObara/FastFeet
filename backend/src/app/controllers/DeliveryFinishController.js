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
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class FinishDeliveryController {
  async update(req, res) {
    const { id, deliveryId } = req.params;
    const { signatureId } = req.body;

    if (
      !(await Deliveryman.findOne({
        where: { id }
      }))
    )
      res.status(400).json({ error: 'Deliveryman does not exists' });

    const delivery = await Delivery.findByPk({
      where: {
        id: deliveryId,
        start_date: {
          [Op.ne]: null
        },
        signature_id: null
      }
    });

    if (!delivery) res.status(400).json({ error: 'Delivery does not exists' });

    const initialDate = parseISO(delivery.start_date);
    const finalDate = parseISO(new Date());

    // if (start_date && isBefore(initialDate, new Date()))
    //   res.status(400).json({ error: 'Past dates are not allowed !' });

    if (isBefore(finalDate, initialDate))
      res.status(400).json({
        error: 'Delivery date must be after the withdrawal date'
      });

    const signature = await File.findByPk(signatureId);

    if (!signature)
      res.status(400).json({
        error: 'Signature does not found!'
      });

    await delivery.update({
      end_date: new Date(),
      signature_id: signatureId
    });
    // const initialHour = setSeconds(setMinutes(setHours(initialDate, 8), 0), 0);
    // const finalHour = setSeconds(setMinutes(setHours(initialDate, 18), 0), 0);

    // if (isAfter(initialDate, finalHour) || isBefore(initialDate, initialHour))
    //   res.status(400).json({
    //     error: 'Orders pickup only between 08:00AM and 18:00PM'
    //   });

    // const { count: numbersOfDeliveries } = await Delivery.findAndCountAll({
    //   where: {
    //     deliveryman_id: id,
    //     start_date: {
    //       [Op.between]: [startOfDay(initialDate), endOfDay(initialDate)]
    //     }
    //   }
    // });

    // if (numbersOfDeliveries >= 5)
    //   res.status(400).json({ error: 'maximum deliveries reached' });

    // const UpdatedDelivery = await Delivery.findOne({
    //   where: {
    //     deliveryman_id: id
    //   }
    // });

    // if (UpdatedDelivery.start_date !== null && start_date) {
    //   UpdatedDelivery.start_date = initialDate;
    //   await UpdatedDelivery.update();
    // } else {
    //   res.status(400).json({
    //     error: "You can't withdraw a this delivery again"
    //   });
    // }

    return res.json(delivery);
  }
}

export default new FinishDeliveryController();
