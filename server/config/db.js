const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Configuração para Banco na Nuvem (Supabase, Render, Neon, etc)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Ignora erro de certificado auto-assinado
      },
    },
  });
} else {
  // Configuração Local
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      port: process.env.DB_PORT,
      logging: false,
    }
  );
}

module.exports = sequelize;
