const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Volunteer = sequelize.define('Volunteer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // pending, approved, rejected
  }
});

module.exports = Volunteer;
