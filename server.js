const express = require('express');
const studentRoutes = require('./src/student/routes');

const app = express();
const port = 3000;

// middleware: allows us to post and get json from the endpoints
app.use(express.json());

app.get('/', (req, res) => {
	res.send('<h1>Testing</h1>');
});

app.use('/api/v1/students', studentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
