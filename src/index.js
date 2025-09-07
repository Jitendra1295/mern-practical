require('reflect-metadata');
require('dotenv').config();
const express = require('express');
const enrollRoutes = require('./routes/enroll');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const { AppDataSource } = require('./data-source');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/enroll', enrollRoutes);
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);

app.get('/', (req, res) => res.send('MERN Practical Backend (TypeORM)'));

// Global error handler (must be last)
app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });