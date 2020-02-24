import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters.')
        .max(100, 'Name has a maximum limit of 100 characters.'),
      street: Yup.string()
        .min(2, 'Street must be at least 2 characters.')
        .max(100, 'Street has a maximum limit of 100 characters.'),
      number: Yup.number(),
      complement: Yup.number(),
      state: Yup.string()
        .min(2, 'State must be at least 2 characters.')
        .max(100, 'State has a maximum limit of 100 characters.'),
      city: Yup.string()
        .min(2, 'City must be at least 2 characters.')
        .max(100, 'City has a maximum limit of 100 characters.'),
      zip_code: Yup.string()
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: error.inner });
  }
};
