const pinModel = require("./pins.model");
const jwt = require("jsonwebtoken");

const all = async (req, res) => {
    const pins = await pinModel.getAll();
    res.json(pins);
};

const create = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token);

    const pin = await pinModel.create({
        ...req.body,
        userId: tokenDecoded.id
    });

    res.status(201).json(pin);
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
};
