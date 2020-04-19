import * as Yup from 'yup';

export const finishDelivery = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .nullable(false)
        .required('Deliveryman Id is required'),
      deliveryId: Yup.number()
        .nullable(false)
        .positive()
        .required('Delivery Id is required')
    });

    const schemaBody = Yup.object().shape({
      signatureId: Yup.number()
        .positive()
        .required('Signature Id is required')
    });

    await schemaBody.validate(req.body, { abortEarly: false });
    await schema.validate(req.params, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
