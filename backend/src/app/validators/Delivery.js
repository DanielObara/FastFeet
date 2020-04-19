import * as Yup from 'yup';

export const createDelivery = async (req, res, next) => {
  try {
    const schema = Yup.object(req.body).shape({
      product: Yup.string()
        .min(2, 'Product must be at least 2 characters.')
        .max(100, 'Product has a maximum limit of 100 characters.')
        .required('Product is required.'),
      recipient_id: Yup.number().required('Recipient is required'),
      deliveryman_id: Yup.number().required('Deliveryman is required')
    });
    await schema.validate(req.params, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};

export const updateDelivery = async (req, res, next) => {
  try {
    const schema = Yup.object(req.body).shape({
      product: Yup.string()
        .min(2, 'Product must be at least 2 characters.')
        .max(100, 'Product has a maximum limit of 100 characters.'),
      recipient_id: Yup.number().nullable(false),
      deliveryman_id: Yup.number().nullable(false)
    });
    await schema.validate(req.params, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};

export const showDelivery = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required('Id is required')
    });
    await schema.validate(req.params, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};

export const deleteDelivery = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required('Id is required')
    });
    await schema.validate(req.params, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
