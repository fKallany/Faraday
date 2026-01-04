const sequelize = require('../config/db');
const User = require('./User');
const Volunteer = require('./Volunteer');

const db = {
  sequelize,
  User,
  Volunteer,
};

module.exports = db;
