const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();



// const routes = require('./routes/route');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.use('/api/user', require('./Routes/userRoutes/userRoutes'));
app.use('/api/collection', require('./Routes/collectionRout/collectionRoute'));
app.use('/api/loan', require('./Routes/loanRoute/loanRoutes'));
app.use('/api/installment', require('./Routes/installmentRoutes/installmentRoutes'));








// Error handling middleware
app.use(errorHandler);

module.exports = app; 