const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const app = express();
const {readdirSync} = require('fs')
require('dotenv').config();

const PORT = process.env.PORT

//HTTP Middleware (посредники)
app.use(express.json())
app.use(cors()) //app.use(cors({domain}))

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))


const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('Слушаете порт', PORT);
    });
}

server()