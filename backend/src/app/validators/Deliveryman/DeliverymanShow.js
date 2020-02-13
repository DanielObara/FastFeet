import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required()
    });
    await schema.validate(req.params, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
