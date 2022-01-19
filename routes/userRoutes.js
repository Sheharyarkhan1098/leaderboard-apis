const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);

router.get("/find", userController.findAll);

router.post("/findAndUpdate", userController.findAndUpdate);

router.get("/findByDate", userController.findByDate);

router.get("/findByName", userController.findByName);

module.exports = router;
