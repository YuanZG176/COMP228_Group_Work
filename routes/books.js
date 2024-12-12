const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');

router.get('/', BookController.getAllBooks);
router.post('/', BookController.addBook);
router.post('/delete/:id', BookController.deleteBook);
router.get('/edit/:id', BookController.editBook);
router.post('/edit/:id', BookController.updateBook);

module.exports = router;
