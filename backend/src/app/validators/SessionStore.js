import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .max(100, 'E-mail has a maximum limit of 100 characters.')
        .required(),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters.')
        .max(25, 'Password must be a maximum limit of 25 characters.')
        .required()
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: error.inner });
  }
};
