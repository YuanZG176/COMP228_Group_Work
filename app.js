require('dotenv').config();
// const Book = require('../models/book');


const JWT = require('./util/JWT');

const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./bnk/books');
// const bookRoutes = require('./routes/bookRoutes');


const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('layout', 'layout'); // 设置默认布局

// 路由
app.use(bookRoutes);

// 解析 JSON 请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 设置视图引擎为 EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静态文件目录（如果需要，例如 CSS 或 JS）
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
app.get('/favicon.ico', (req, res) => res.status(204));  // 返回 204 No Content

app.get('/', (req, res) => {
    res.render('index');  // 渲染 index.ejs
});

// 路由处理根路径
// 加载书籍列表
app.get('/books', (req, res) => {
    const books = [
        { title: 'Book 1', author: 'Author 1' },
        { title: 'Book 2', author: 'Author 2' },
    ];

    res.render('books', { books });
});

app.get('/books/add', (req, res) => {
    res.render('addBook'); // 假设渲染 `addBook.ejs`
});


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 添加 JSON 解析中间件
app.use(express.json());
app.use(cors());
app.use(express.static('public'));


app.use(express.urlencoded({ extended: true })); // 解析表单数据
// Routes
app.use('/books', bookRoutes);



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
