module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'deliveries',
      [
        {
          product: 'Produto 1',
          recipient_id: 1,
          deliveryman_id: 1,
          signature_id: null,
          canceled_at: null,
          start_date: null,
          end_date: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product: 'Produto 2',
          recipient_id: 2,
          deliveryman_id: 2,
          signature_id: null,
          canceled_at: null,
          start_date: null,
          end_date: null,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: async QueryInterface => {
    await QueryInterface.bulkDelete('deliveryman', null, {});
  }
};
