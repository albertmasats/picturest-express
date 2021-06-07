const pinModel = require("./pins.model");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

const all = async (req, res) => {
    const pins = await pinModel.getAll();
    res.json(pins);
};

const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const token = req.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token);

    const pin = await pinModel.create({
        ...req.body,
        userId: tokenDecoded.id
    });

    res.status(201).json(pin);
};

const search = async (req, res) => {
    const text = req.params.text;
    const filteredPins = await pinModel.search({ name: {'$regex' : text, '$options' : 'i'} });
    res.json(filteredPins);
};

const get = async (req, res) => {
};

const update = async (req, res) => {
};

const remove = async (req, res) => {
};

module.exports = {
    all,
    create,
    get,
    update,
    remove,
    search
};
