const route = require("express").Router();
const { guestRout, protectedRoute } = require("../middleware/authMiddleWare");
const userController = require("../controller/user");



route.get("/profile", protectedRoute, userController.getProfile);
route.post("/upload-profile-image", userController.uploadProfileImage);


module.exports = route;