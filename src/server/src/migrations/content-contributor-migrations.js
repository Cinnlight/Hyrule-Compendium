'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('content_contributors', 'content_contributors_user_id_key');

    await queryInterface.removeConstraint('content_contributors', 'content_contributors_content_id_key');

    await queryInterface.changeColumn('content_contributors', 'user_id', {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.changeColumn('content_contributors', 'content_id', {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.addConstraint('content_contributors', {
      fields: ['user_id', 'content_id'],
      type: 'primary key',
      name: 'content_contributors_pkey'
    });
  },

  down: async (queryInterface, Sequelize) => {
    //  Remove the composite primary key
    await queryInterface.removeConstraint('content_contributors', 'content_contributors_pkey');

    // Re-add the original incorrect unique constraint (for rollback)
    await queryInterface.addConstraint('content_contributors', {
      fields: ['user_id'],
      type: 'unique',
      name: 'content_contributors_user_id_key'
    });

    await queryInterface.addConstraint('content_contributors', {
      fields: ['content_id'],
      type: 'unique',
      name: 'content_contributors_content_id_key'
    });
  }
};
