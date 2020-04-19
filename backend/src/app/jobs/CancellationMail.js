import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { delivery, problem } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'An new delivery was canceled!',
      template: 'CancellationMail',
      context: {
        deliveryman: delivery.deliveryman.name,
        delivery_id: delivery.id,
        product: delivery.product,
        problem_description: problem.description
      }
    });
  }
}

export default new CancellationMail();
