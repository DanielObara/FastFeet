import * as Yup from 'yup';

export const createDeliveryProblem = async (req, res, next) => {
  try {
    const params = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required('Id is required.')
    });

    const body = Yup.object().shape({
      description: Yup.string()
        .min(2, 'Description must be at least 5 characters.')
        .max(100, 'Description has a maximum limit of 100 characters.')
        .required('Description is required.')
    });

    await params.validate(req.params, { abortEarly: false });
    await body.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: error.inner });
  }
};

export const showDeliveryProblem = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      deliveryId: Yup.number()
        .positive()
        .required('Id is required.')
    });

    await schema.validate(req.params, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: error.inner });
  }
};

export const deleteDeliveryProblem = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      problemId: Yup.number()
        .positive()
        .required('Id is required.')
    });

    await schema.validate(req.params, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: error.inner });
  }
};
