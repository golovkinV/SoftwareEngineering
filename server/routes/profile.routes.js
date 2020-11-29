

module.exports = app => {
    const profileController = require("../controllers/profile.controller.js");

    const router = require("express").Router();

    //User by id
    router.get("/:id", profileController.findOne);

    app.use('/api/profile', router);
};