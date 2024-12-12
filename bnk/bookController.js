const BookService = require('../services/bookService');  // 导入BookService

// 获取书籍列表，支持分页
const getBooks = async (req, res) => {
    try {
        console.log(req.query);  // 打印请求中的查询参数
        const { page = 1, limit = 10 } = req.query;  // 获取分页参数，默认page=1，limit=10

        // 获取书籍数据
        const books = await BookService.getBooks(parseInt(page), parseInt(limit));

        // 将数据传递给前端渲染
        res.render('books', { books });  // 假设你使用EJS来渲染
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching books');
    }
}