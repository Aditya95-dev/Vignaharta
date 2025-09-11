# Express Mongoose Project

A standard Express.js and Mongoose project structure with best practices.

## Project Structure

```
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── utils/         # Utility functions
│   ├── services/      # Business logic
│   └── public/        # Static files
│       ├── css/
│       ├── js/
│       └── images/
├── tests/             # Test files
├── .env              # Environment variables
├── .gitignore        # Git ignore file
├── package.json      # Project dependencies
└── README.md         # Project documentation
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your environment variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your_database
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with nodemon
- `npm test`: Run tests

## Features

- Express.js for the web framework
- Mongoose for MongoDB ODM
- CORS enabled
- Helmet for security headers
- Morgan for HTTP request logging
- Environment variable configuration
- Static file serving
- Error handling middleware 