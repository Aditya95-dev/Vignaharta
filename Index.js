require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

// app.use(express.json());
// Connect to Database
connectDB();



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 