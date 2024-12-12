const BookService = require('../services/bookService');

const BookController = {
    async addBook(req, res) {
        try {
            const { title, author, description, price } = req.body;
            await BookService.addBook({ title, author, description, price });
            const books = await BookService.getAllBooks();
            res.status(201).json({ success: true, books });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to add book' });
        }
    },

    async getAllBooks(req, res) {
        try {
            const books = await BookService.getAllBooks();
            res.render('books', { books });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching books');
        }
    },

    async deleteBook(req, res) {
        try {
            await BookService.deleteBook(req.params.id);
            res.redirect('/books');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error deleting book');
        }
    },

    async editBook(req, res) {
        try {
            const book = await BookService.getBookById(req.params.id);
            res.render('editBook', { book });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error editing book');
        }
    },

    async updateBook(req, res) {
        try {
            const { title, author, description, price } = req.body;
            await BookService.updateBook(req.params.id, { title, author, description, price });
            res.redirect('/books');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating book');
        }
    },
};

module.exports = BookController;
