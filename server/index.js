require("dotenv/config");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const userRouter = require("./routes/userRoutes");
const { handleRefreshTokenRequest } = require("./controllers/authController");

const server = express();
const PORT = process.env.PORT || 3001;

server.use(cors());
server.use(cookieParser());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Routes
server.post("/api/v1/refresh_token", handleRefreshTokenRequest);
server.use("/api/v1/users", userRouter);

server.all("*", (req, res, next) => {
  return next({
    statusCode: 404,
    message: `${req.originalUrl} does not exist on this server.`,
  });
});

// Global error handler
server.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({
    error: {
      message: message || "Unknown error occurred.",
    },
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening to PORT ${PORT}`);
});
