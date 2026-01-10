const { User } = require('./models');
const sequelize = require('./config/db');

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados...');

    const adminExists = await User.findOne({ where: { email: 'admin@admin.com' } });

    if (adminExists) {
      console.log('Usuário Admin já existe!');
    } else {
      await User.create({
        username: 'Admin',
        email: 'admin@admin.com',
        password: 'admin',
      });
      console.log('Usuário Admin criado com sucesso!');
      console.log('Email: admin@admin.com');
      console.log('Senha: admin');
    }

    process.exit();
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
    process.exit(1);
  }
};

seedAdmin();
