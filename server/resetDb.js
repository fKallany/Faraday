const { User, Volunteer } = require('./models');
const sequelize = require('./config/db');

const resetDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados...');

    // Limpar tabela de Voluntários
    await Volunteer.destroy({ where: {}, truncate: true });
    console.log('Tabela Volunteers limpa.');

    // Limpar tabela de Usuários
    await User.destroy({ where: {}, truncate: true });
    console.log('Tabela Users limpa.');

    process.exit();
  } catch (error) {
    console.error('Erro ao limpar banco de dados:', error);
    process.exit(1);
  }
};

resetDb();
