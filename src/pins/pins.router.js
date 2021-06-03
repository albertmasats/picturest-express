const express = require("express");
const router = express.Router();
const pinsController = require("./pins.controller");
const jwt = require("jsonwebtoken");

const middleware = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json("Forbidden.");
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
        if (err) {
            return res.status(401).json(err)
        }

        return next();
    });
}

router.route("/")
    .get(pinsController.all)
    .post(middleware, pinsController.create);

router.route("/:id")
    .get(pinsController.get)
    .delete(pinsController.remove)
    .put(pinsController.update);

module.exports = router;
