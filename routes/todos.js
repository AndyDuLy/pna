const express = require('express');
const router = express.Router();


// Controller callback functions
const { CREATE, READ, UPDATE, DELETE } = require('../controllers/todos');
const { VerifyJWT } = require('../controllers/auth');

// CRUD and middleware
router.post('/newTodo', VerifyJWT, CREATE);
router.get('/getTodo', VerifyJWT, READ);
router.put('/updateTodo', VerifyJWT, UPDATE);
router.delete('/deleteTodo', VerifyJWT, DELETE);


module.exports = router;
