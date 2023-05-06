// this is where we will store the business logic related to each route
const queries = require('./queries');
const pool = require('../../db');

// GET: http://localhost:3000/api/v1/students
const getStudents = (req, res) => {
	// pool.query('SELECT * FROM students', (error, results) => {
	pool.query(queries.getStudents, (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

// GET: http://localhost:3000/api/v1/students/:id
const getStudentById = (req, res) => {
	const id = parseInt(req.params.id);

	pool.query(queries.getStudentById, [id], (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows); // if the response is ok send back the json
	});
};

// POST: http://localhost:3000/api/v1/students + JSON data
const addStudent = (req, res) => {
	// when we send data we're sending it in the json format
	const { name, email, age, dob } = req.body; // destructuring

	// check if the data already exists
	pool.query(queries.checkEmailExists, [email], (error, results) => {
		// if there's an array it results to true, and an empty array results in false
		if (results.rows.length) res.send('Email already exists');

		//  add student to database
		pool.query(
			queries.addStudent,
			[name, email, age, dob],
			(error, results) => {
				if (error) throw error;
				res.status(201).send('Student created successfully'); // 201: successful creation
			},
		);
	});
};

// DELETE: http://localhost:3000/api/v1/students/:id
const removeStudent = (req, res) => {
	const id = parseInt(req.params.id);

	pool.query(queries.getStudentById, [id], (error, results) => {
		const noStudentFound = !results.rows.length; // if there are no results / length of results is 0 then noStudentFound
		if (noStudentFound) res.send('Student does not exist in the database');
	});
	pool.query(queries.removeStudent, [id], (error, results) => {
		if (error) throw error;
		res.status(200).send('Student removed successfully');
	});
};

// exporting as an object because there's going to be multiple of these functions
module.exports = {
	getStudents,
	getStudentById,
	addStudent,
	removeStudent,
};
