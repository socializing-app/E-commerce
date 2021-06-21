const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db  = require("./models");

const server = express();
const PORT = process.env.PORT || 3001;

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use((err, req, res, next) => {
    const { statusCode, message } = err
    res.status(statusCode).json({
      error: {
        message: message || 'Unknown error occurred.',
      },
    })
})

server.listen(PORT, () => {
    console.log(`Server is listening to PORT ${PORT}`);
});