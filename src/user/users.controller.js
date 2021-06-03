const userModel = require("./users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const all = async (req, res) => {
  const users = await userModel.getAll();
  res.json(users);
};

const create = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);

  const user = await userModel.create({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, salt),
  });

  const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET);

  res.status(201).json(token);
};

const get = async (req, res) => {
    const user = await userModel.getOne(req.params.id);
    res.status(201).json(user);
};

const update = async (req, res) => {};

const remove = async (req, res) => {};

module.exports = {
  all,
  create,
  get,
  update,
  remove,
};
