const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database'); // Import database connection
const productRoutes = require('./routes/routes'); // Import routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB();

// Use routes for product-related API endpoints
app.use('/api/products', productRoutes);

// Start the server on port 5000 (or any port you specify)
const port = process.env.PORT || 5000; // Default to 5000 if no port is specified in the environment variable
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Press Ctrl + C to quit');
});
