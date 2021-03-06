import DeliveryProblems from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class ProblemController {
  async store(req, res) {
    const { deliveryId } = req.params;
    const { description } = req.body;

    const deliveryExists = await Delivery.findByPk(deliveryId);

    if (!deliveryExists) {
      return res.status(401).json({ error: 'Delivery not found.' });
    }

    const problem = await DeliveryProblems.create({
      delivery_id: deliveryId,
      description
    });

    return res.json({
      problem,
      delivery: deliveryExists
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const problems = await DeliveryProblems.findAll({
      attributes: ['id', 'description', 'delivery_id'],
      delivery: ['delivery_id'],
      limit: 7,
      offset: (page - 1) * 7,
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'deliveryman_id',
            'recipient_id',
            'canceled_at'
          ],
          where: {
            canceled_at: null
          }
        }
      ]
    });

    return res.json(problems);
  }

  async show(req, res) {
    const { deliveryId } = req.params;

    const problems = await DeliveryProblems.findAll({
      where: {
        delivery_id: deliveryId
      },
      attributes: ['id', 'description', 'created_at'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product', 'deliveryman_id', 'recipient_id']
        }
      ]
    });

    return res.json(problems);
  }

  async delete(req, res) {
    const { problemId: id } = req.params;

    const problem = await DeliveryProblems.findByPk(id);

    if (!problem) {
      return res.status(400).json({ error: "Problem doens't exist" });
    }


    const delivery = await Delivery.findByPk(problem.delivery_id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email']
        }
      ]
    });

    if (!delivery) {
      return res.status(401).json({ error: 'Delivery not found' });
    }

    delivery.canceled_at = new Date();

    await delivery.save();

    if (process.env.NODE_ENV !== 'test') {
      await Queue.add(CancellationMail.key, {
        delivery,
        problem: problem
      });
    }

    return res.json(delivery);
  }
}

export default new ProblemController();
