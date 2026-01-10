const { Volunteer, User } = require('../models');

// Criar um novo voluntário e usuário para login
const createVolunteer = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Verificar se o usuário já existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    // Criar Usuário (Para Login)
    await User.create({
      username: name,
      email,
      password, // O hook do modelo fará o hash
    });

    // Criar Voluntário (Dados Específicos)
    const newVolunteer = await Volunteer.create({
      name,
      email,
      phone,
      status: 'pending', // Status inicial padrão
    });

    res.status(201).json(newVolunteer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar voluntário.' });
  }
};

const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.findAll();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (volunteer) {
      res.json(volunteer);
    } else {
      res.status(404).json({ message: 'Volunteer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (volunteer) {
      await volunteer.update(req.body);
      res.json(volunteer);
    } else {
      res.status(404).json({ message: 'Volunteer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (volunteer) {
      await volunteer.destroy();
      res.json({ message: 'Volunteer removed' });
    } else {
      res.status(404).json({ message: 'Volunteer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createVolunteer,
  getVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
};
