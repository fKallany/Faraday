const { User } = require('./models');
const sequelize = require('./config/db');

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados...');

    // Verifica se já existe o usuário admin
    const adminExists = await User.findOne({ where: { email: 'admin@admin.com' } });

    if (adminExists) {
      console.log('Usuário Admin já existe!');
      console.log('Email: admin@admin.com');
      console.log('Senha: admin'); // Se a senha foi alterada, essa mensagem pode não ser precisa
    } else {
      await User.create({
        username: 'Admin',
        email: 'admin@admin.com',
        password: 'admin', // A senha será criptografada automaticamente pelo hook do modelo
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
