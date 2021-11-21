require("dotenv/config");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const userRouter = require("./routes/userRoutes");
const configRouter = require("./routes/configRoutes");
const productRouter = require("./routes/products");
const categoryRouter = require("./routes/category");
const reviewsRouter = require("./routes/reviews");
const utilRouter = require("./routes/utils");
const { handleRefreshTokenRequest } = require("./controllers/authController");

const server = express();
const PORT = process.env.PORT || 3001;

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
server.use(cookieParser());

server.use(express.json({limit: '50mb'}));
server.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
server.post("/api/v1/refresh_token", handleRefreshTokenRequest);
server.use("/api/v1/users", userRouter);
server.use("/api/v1/products", productRouter);
server.use("/api/v1/reviews", reviewsRouter);
server.use("/api/v1/category", categoryRouter);
server.use("/api/v1/config", configRouter);
server.use("/api/v1/utils", utilRouter);

server.all("*", (req, res, next) => {
  return next({
    statusCode: 404,
    message: `${req.originalUrl} does not exist on this server.`,
  });
});

// Global error handler
server.use((err, req, res, next) => {
  const { statusCode, message } = err;

  const errorMessage = message || err.error.message;
  
  res.status(statusCode || 500).json({
    error: {
      message: errorMessage || "Unknown error occurred.",
    },
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening to PORT ${PORT}`);
});
