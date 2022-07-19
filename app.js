const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const dotenv = require("dotenv");
const cors = require("cors");

// Custom Imports
const userRoutes = require("./src/routes/users.routes");

// App
const app = express();

// Configs
dotenv.config();
app.use(express.json());
app.use(cors());

// Port
const PORT = process.env.PORT || 3000;

// Swagger definitison
const swaggerDefinition = {
  info: {
    title: "Users API",
    version: "1.0.0",
  },
  host: `localhost:${PORT}`,
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js", "./src/routes/parameters.yaml"],
};

const swaggerSpec = swaggerJSDoc(options);

// Serve swagger docs the way you like (Recommendation: swagger-tools)
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", userRoutes);

const Server = app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION");
  console.loog(err.name, err.message);
  Server.close(() => {
    process.exit(1);
  });
});
