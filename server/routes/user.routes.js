module.exports = app => {
    const userController = require("../controllers/user.controller.js");

    const router = require("express").Router();

    // Register User
    router.post("/", userController.register);

    // Login User
    router.get("/",userController.login);

    // All Users
    router.get("/all",userController.findAll);

    app.use('/api/user', router);
};