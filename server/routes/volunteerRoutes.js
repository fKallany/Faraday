const express = require('express');
const router = express.Router();
const {
  createVolunteer,
  getVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
} = require('../controllers/volunteerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createVolunteer); // Maybe public?
router.get('/', protect, getVolunteers);
router.get('/:id', protect, getVolunteerById);
router.put('/:id', protect, updateVolunteer);
router.delete('/:id', protect, deleteVolunteer);

module.exports = router;
