const express = require('express');
const router = express.Router();


// Controllers
const authRoutes = require('./auth');
const todoCrudRoutes = require('./todos');

// Middleware
router.use('/auth', authRoutes); // Endpoint is /auth/{endpoint}
router.use('/todos', todoCrudRoutes); // Endpoint is /todos/{endpoint}


module.exports = router;
