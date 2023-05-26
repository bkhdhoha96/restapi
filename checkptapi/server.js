require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

// Connect to the database
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the users router
app.use('/users', usersRouter);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
