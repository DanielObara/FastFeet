module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'deliveryman',
      [
        {
          name: 'Entregador 1',
          email: 'entregador1@fastfeet.com',
          avatar_id: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Entregador 2',
          email: 'entregador2@fastfeet.com',
          avatar_id: null,
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
