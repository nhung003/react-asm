const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');
const userRoute = require('./routes/user');

app.use(express.json());

const port = 8000;
app.listen(port, () =>{
     console.log(`Ung dung dang chay voi port ${port}`);
});

app.use('/product', productRoute);
app.use('/category', categoryRoute);
app.use('/user', userRoute);


