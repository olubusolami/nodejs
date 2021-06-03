const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')

dotenv.config();

//connect to mongoose
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(res => console.log('connected to database'))

//middleware
app.use(express.json());
//Route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

port = process.env.PORT || 4000 
app.listen(port, () => console.log('server up and running beautifully'));