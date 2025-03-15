require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware Settings
app.use(express.json());        // Parsing JSON Request Body
app.use(cors());                // Allow cross-domain requests

// Connecting to a MongoDB Database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    // Start the server only when the database connection is successful
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })

  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
  app.get("/", (req, res) => {
    res.send("Server is running.");
  });
  
// Routing Configuration
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
