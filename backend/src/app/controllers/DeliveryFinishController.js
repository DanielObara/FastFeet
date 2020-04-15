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

    return res.json(delivery);
  }
}

export default new FinishDeliveryController();
