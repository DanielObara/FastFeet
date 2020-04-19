import * as Yup from 'yup';

export const startOrder = async (req, res, next) => {
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
    await schema.validate(req.params, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};

export const listOrderToDeliveryman = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required('Delivery Id is required')
    });
    await schema.validate(req.params, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};

export const showOrderToDeliveryman = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      deliveryId: Yup.number()
        .positive()
        .required('Delivery Id is required'),
      id: Yup.number()
        .positive()
        .required('Deliveryman Id is required')
    });
    await schema.validate(req.params, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};

export const deleteOrder = async (req, res, next) => {
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
