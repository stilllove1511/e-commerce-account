'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            'role',
            [
                {
                    code: 'admin',
                    name: 'admin',
                },
                {
                    code: 'customer',
                    name: 'customer',
                },
            ],
            {},
        )
        await queryInterface.bulkInsert(
            'user',
            [
                {
                    username: 'admin',
                    password:
                        '$2b$10$ngaVbYcTPLzfGKlwGgvv6.C0eLvoc1CcgWPiK.RLXqcpRStU4lFQi', //mylove
                    roleCode: 'admin',
                },
                {
                    username: 'customer',
                    password:
                        '$2b$10$ngaVbYcTPLzfGKlwGgvv6.C0eLvoc1CcgWPiK.RLXqcpRStU4lFQi', //mylove
                    roleCode: 'customer',
                },
            ],
            {},
        )
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
}
