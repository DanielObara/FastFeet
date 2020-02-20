const schema = Yup.object(req.body).shape({
  product: Yup.string().required(),
  recipient_id: Yup.number().required(),
  deliveryman_id: Yup.number().required()
});

if (!(await schema.isValid(req.body))) {
  return res.status(400).json({ error: 'Validation fail' });
}
