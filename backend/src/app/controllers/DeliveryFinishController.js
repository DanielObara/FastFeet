import { Op } from 'sequelize';
import { isBefore } from 'date-fns';
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

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        start_date: {
          [Op.ne]: null
        }
      }
    });

    if (!delivery) {
      return res.status(400).json({
        error: "Delivery doesn't exists or has not yet been withdrawn"
      });
    }
    if (delivery.signature_id) {
      return res
        .status(400)
        .json({ error: 'This order has already been delivered' });
    }

    if (isBefore(new Date(), delivery.start_date)) {
      return res.status(400).json({
        error: 'Delivery date must be after the withdrawal date'
      });
    }

    const signature = await File.findByPk(signatureId);

    if (!signature) {
      return res.status(400).json({
        error: 'Signature does not found!'
      });
    }

    await delivery.update({
      end_date: new Date(),
      signature_id: signatureId
    });

    return res.json(delivery);
  }
}

export default new FinishDeliveryController();
