// server.js — the entry point of our backend

// 1. Load environment variables from .env BEFORE anything else uses them
require('dotenv').config();

// 2. Import Express and Mongoose
const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
// 3. Create an "app" — this represents our whole server
const app = express();

// 4. Middleware: allow Express to understand incoming JSON request bodies

app.use(cors());
app.use(express.json());

// 4b. Wire up our auth routes — anything starting with /api/auth
//     will be handled by authRoutes.js
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// 5. Define a route: when someone sends a GET request to /api/hello,
//    run this function and send back a response
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Service Request Management System is running' });
});

// 6. Connect to MongoDB using the URI stored in .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 7. Tell the server which port to listen on
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});