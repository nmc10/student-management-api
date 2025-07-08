const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/auth');

router.post('/', auth, studentController.createStudent);
router.get('/', auth, studentController.getStudent);
router.get('/:id', auth, studentController.getStudentById);
router.put('/:id', auth, studentController.updateStudent);
router.delete('/:id', auth, studentController.deleteStudent);

module.exports = router;


