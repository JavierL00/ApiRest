import { Sequelize } from 'sequelize';

const db = new Sequelize('node', 'diars_user', '123456', {
    host: 'localhost',
    dialect: 'mssql',
    // logging: false,
});

export default db;