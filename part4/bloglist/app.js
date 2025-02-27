/** @format */

const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const loginRouter = require("./controllers/login");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB.");
	})
	.catch((err) => console.log("Error connecting to MongoDB:", err.message));

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);

if (process.env.NODE_ENV === "test") {
	const testingRouter = require("./controllers/testing");
	app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
