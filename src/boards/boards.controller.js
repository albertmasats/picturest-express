const boardModel = require("./boards.model");
const pinModel = require("../pins/pins.model");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const all = async (req, res) => {
  const boards = await boardModel.getAll();
  res.json(boards);
};

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const token = req.headers.authorization.split(" ")[1];
  const tokenDecoded = jwt.decode(token);

  const board = await boardModel.create({
    ...req.body,
    author: tokenDecoded.id,
  });

  res.status(201).json(board);
};

const search = async (req, res) => {
  const text = req.params.text;
  const filteredboards = await pinModel.search({
    name: { $regex: text, $options: "i" },
  });
  res.json(filteredboards);
};

const getPinsOfBoard = async (req, res) => {
  const pins = await pinModel.search({
    boards: { $elemMatch: { $eq: req.params.id } },
  });
  res.json(pins);
};

const get = async (req, res) => {};

const update = async (req, res) => {};

const remove = async (req, res) => {};

module.exports = {
  all,
  create,
  get,
  update,
  remove,
  search,
  getPinsOfBoard,
};
