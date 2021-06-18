const express = require("express");
const router = express.Router();
const boardsController = require("./boards.controller");
const { requireAuthMiddleware } = require("../auth/middleware");

router
  .route("/")
  .get(boardsController.all)
  .post(requireAuthMiddleware, boardsController.create);

router
  .route("/:id")
  .get(boardsController.get)
  .delete(requireAuthMiddleware, boardsController.remove)
  .put(requireAuthMiddleware, boardsController.update);

router.route("/:id/pins").get(boardsController.getPinsOfBoard);

router.route("/search/:text").get(boardsController.search);

module.exports = router;
