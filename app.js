const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routesUsers = require("./routes/users");
const routesCards = require("./routes/cards");

const { PORT = 3000 } = process.env;
const DATABASE_URL = "mongodb://127.0.0.1:27017/mestodb";

app.use((req, res, next) => {
  req.user = {
    _id: "640a1659f0055013872d2667",
  };

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", routesUsers);
app.use("/cards", routesCards);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log("Error on database connection");
    console.error(err);
  });

app.use((req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
