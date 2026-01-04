const { Volunteer } = require('../models');

const createVolunteer = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const volunteer = await Volunteer.create({
      name,
      email,
      phone,
    });
    res.status(201).json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
