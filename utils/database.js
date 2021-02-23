const Sequelize = require('sequelize');
const Op = Sequelize.Op;
require('dotenv').config()
const operatorsAliases = {
  $or: Op.or,
  $eq: Op.eq,
  $ne: Op.ne,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
  $and: Op.and,
  $like: Op.like,
};
//cs


const sequelize = new Sequelize(process.env.database, process.env.USER_NAME, process.env.password, {
  dialect: 'mysql',
  host: process.env.host,
  port: process.env.port,
  operatorsAliases: operatorsAliases
});

module.exports = sequelize;



