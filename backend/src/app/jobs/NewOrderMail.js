import Mail from '../../lib/Mail';

class NewOrderMail {
  get key() {
    return 'NewOrderMail';
  }

  async handle({ data }) {
    const { delivery, deliveryman, recipient } = data;

    console.log('A fila executou!');

    await Mail.sendMail({
      to: `${delivery.name} <${deliveryman.email}>`,
      subject: 'New delivery was asigned to you!',
      template: 'NewOrderMail',
      context: {
        deliveryman: deliveryman.name,
        deliveryid: delivery.id,
        receiver: recipient.name,
        product: delivery.product,
        street: recipient.street,
        number: recipient.number,
        zipCode: recipient.zip_code,
        complement: recipient.complement,
        city: recipient.city,
        state: recipient.state
      }
    });
  }
}

export default new NewOrderMail();
