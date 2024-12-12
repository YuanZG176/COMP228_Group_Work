const express = require('express');
const Book = require('../models/book');
const router = express.Router();


const BookController = require('../controllers/bookController');





// 获取书籍列表（分页）
router.get('/books', BookController.getAllBooks);  // 调用getBooks方法


// 添加图书
router.post('/book', BookController.addBook);



// 获取单个图书
// router.get('/book/:id', BookController.getBookById);



// Get all books

// Add a new book
router.get('/add', (req, res) => {
    res.render('addBook');
});

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();  // 获取所有书籍
        console.log('Books Fetched:', books);  // 确认书籍已从数据库加载
        res.render('books', { books });  // 渲染视图并传递数据
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Error fetching books');
    }
});



// Add a new book
router.post('/add', async (req, res) => {
    try {
        const { title, author, price } = req.body; // 从请求体中解构
        if (!price) {
            return res.status(400).send('Price is required');
        }
        const newBook = new Book({ title, author, price });
        await newBook.save();
        res.redirect('/books');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving book');
    }
});


// Edit a book
router.get('/edit/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render('editBook', { book });
});

router.post('/edit/:id', async (req, res) => {
    const { title, author, description, price } = req.body;
    await Book.findByIdAndUpdate(req.params.id, { title, author, description, price });
    res.redirect('/books');
});

// Delete a book
router.post('/delete/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
});




module.exports = router;
