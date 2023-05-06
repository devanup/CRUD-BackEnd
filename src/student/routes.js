// this is where we will store all the student routes
const { Router } = require('express');
const controller = require('./controller');
const router = Router();

/*router.get('/', (req, res) => {
	res.send('using api route');
});*/

// When we go to api/v1/students, we call this function
router.get('/', controller.getStudents);
router.get('/:id', controller.getStudentById);
router.post('/', controller.addStudent);
router.delete('/:id', controller.removeStudent);

module.exports = router;
