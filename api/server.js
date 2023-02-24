const express = require("express");
const server = express();
server.use(express.json());

require("dotenv").config();

const projectsRouter = require("./projects/projects-router");
server.use("/api/projects", projectsRouter);

const actionsRouter = require("./actions/actions-router");
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: process.env.MESSAGE || "Server is up and running..",
  });
});

module.exports = server;
