import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('test', 'jaymeson', 'Abcd1234*', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log,
});

export default sequelize;
