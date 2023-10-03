const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./database');
const router = require('./router');

require('dotenv').config();

connectDatabase();

const app = express();

app
    .use(cors())
    .use(express.urlencoded({ extended: true }))
    .use(express.static('public'))
    .use('/', router);

app
    .use((error, request, response, next) => {
    console.error(error.stack)
    response.status(500).send('Something broke!')
    })

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
});


