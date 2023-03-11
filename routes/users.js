const routesUsers = require("express").Router();

const {
  getUsers,
  getCurrentUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

routesUsers.get("/", getUsers);
routesUsers.get("/:userId", getCurrentUser);
routesUsers.post("/", createUser);
routesUsers.patch("/me", updateProfile);
routesUsers.patch("/me/avatar", updateAvatar);

module.exports = routesUsers;
