import Mail from '../../lib/Mail';

class NewOrderMail {
  get key() {
    return 'NewOrderMail';
  }

  async handle({ data }) {
    const { delivery, deliveryman, recipient } = data;

    await Mail.sendMail({
      to: `${delivery.name} <${deliveryman.email}>`,
      subject: 'New delivery was asigned to you!',
      template: 'NewOrderMail',
      context: {
        deliverymanName: deliveryman.name,
        deliveryid: delivery.id,
        receiver: recipient.name,
        product: delivery.product,
        street: recipient.street,
        number: recipient.number,
        zipCode: recipient.zip_code,
        city: recipient.city,
        state: recipient.state,
        complement: recipient.complement
      }
    });
  }
}

export default new NewOrderMail();
