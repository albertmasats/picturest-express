const pinModel = require("./pins.model");

const all = async (req, res) => {
  const pins = await pinModel.getAll();
  res.json(pins);
};

const create = async (req, res) => {
  const pin = await pinModel.create(req.body);
  res.status(201).json(pin);
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
};
