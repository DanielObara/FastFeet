module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'Teste 1',
          street: 'Rua teste',
          zip_code: '02539-000',
          number: 1,
          state: 'SP',
          city: 'SP',
          complement: 'casa',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Teste 2',
          street: 'Rua imagine',
          zip_code: '02539-000',
          number: 20,
          state: 'RS',
          city: 'Erechim',
          complement: 'APTO',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
