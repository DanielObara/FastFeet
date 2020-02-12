import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters.')
        .max(100, 'Name has a maximum limit of 100 characters.')
        .required(),
      street: Yup.string().when('zip_code', (zip_code, field) =>
        zip_code
          ? field
              .min(2, 'Street must be at least 2 characters.')
              .max(100, 'Street has a maximum limit of 100 characters.')
              .required()
          : field
      ),

      number: Yup.number().required(),
      complement: Yup.number(),
      state: Yup.string().when('uf', (uf, field) =>
        uf
          ? field
              .min(2, 'State must be at least 2 characters.')
              .max(100, 'State has a maximum limit of 100 characters.')
              .required()
          : field
      ),

      city: Yup.string()
        .min(2, 'City must be at least 2 characters.')
        .max(100, 'City has a maximum limit of 100 characters.')
        .required(),
      zip_code: Yup.string().required()
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: error.inner });
  }
};
