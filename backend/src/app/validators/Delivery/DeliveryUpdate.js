const schema = Yup.object(req.body).shape({
  product: Yup.string(),
  recipient_id: Yup.number(),
  deliveryman_id: Yup.number()
});

if (!(await schema.isValid(req.body))) {
  return res.status(400).json({ error: 'Validation fail' });
}
