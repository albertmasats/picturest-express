const express = require("express");
const router = express.Router();
const pinsController = require("./pins.controller");
const { body } = require("express-validator");
const { requireAuthMiddleware } = require("../auth/middleware");

router
  .route("/")
  .get(pinsController.all)
  .post(requireAuthMiddleware, body("urlImage").isURL(), pinsController.create);

router
  .route("/:id")
  .get(pinsController.get)
  .delete(requireAuthMiddleware, pinsController.remove)
  .put(requireAuthMiddleware, pinsController.update);

router.route("/search/:text").get(pinsController.search);

module.exports = router;
