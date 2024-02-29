"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('test', 'jaymeson', 'Abcd1234*', {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log,
});
exports.default = sequelize;
