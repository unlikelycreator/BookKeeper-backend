// routes/bookRoutes.js
const express = require('express');
const { getBooks, createBook, updateBook } = require('../controllers/BookController');
const router = express.Router();
//const authMiddleware = require('../middleware/authMiddleware');

router.get('/getbooks', getBooks);
router.post('/books', createBook);
router.put('/updateBook', updateBook);

module.exports = router;