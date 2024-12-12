const Book = require('../models/book');

export const BookService = {
    async addBook(bookData) {
        const newBook = new Book(bookData);
        return await newBook.save();
    },

    async getAllBooks() {
        return await Book.find().sort({ createdAt: -1 });
    },

    async getBookById(id) {
        return await Book.findById(id);
    },

    async updateBook(id, bookData) {
        return await Book.findByIdAndUpdate(id, bookData, { new: true });
    },

    async deleteBook(id) {
        return await Book.findByIdAndDelete(id);
    },
};




// export const createBook = (bookData) => {
//     const newBook = new Book(bookData);
//     return newBook.save();
// }


// export const getAllBooks = () => {
//     return Book.find().sort({ createdAt: -1 });
// }


// export const getBookById = (id) => {
//     return Book.findById(id);
// }


// export const updateBook = (id, bookData) => {
//     return Book.findByIdAndUpdate(id, bookData, { new: true });
// }


// export const deleteBook = (id) => {
//     return Book.findByIdAndDelete(id);
// }

module.exports = BookService;






