// require('dotenv').config();
// const app = require('./app');
// const connectDB = require('./config/database');

// // app.use(express.json());
// // Connect to Database
// connectDB();



// // Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// }); 


require('dotenv').config();
const mongoose = require('mongoose');  
const app = require('./app');

// Connect to Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,    
      useUnifiedTopology: true, 
    });
    console.log('✅ Database Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); 
  }
};

// Start the server only after DB is connected
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
