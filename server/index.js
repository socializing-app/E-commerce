const express = require("express");
const cors = require("cors");
const db = require("./models");

const server = express();
const PORT = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    error: {
      message: message || "Unknown error occurred.",
    },
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening to PORT ${PORT}`);
});
