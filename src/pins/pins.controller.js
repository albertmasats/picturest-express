const persimon = require("../../utils/persimon");
const db = persimon("/resources/pins/pins.json"); // Relative to the project root

const pinsController = {
    all (req, res) {
        const pins = db.all();
        res.json(pins);
    },
    get (req, res) {
        const pin = db.get(req.params.id);
        if (pin) {
          return res.status(200).json(pin);
        }
        return res.status(404).json({ error: "pin not found" });
    },
    create (req, res) {
        const entities = db.create(req.body);
        res.status(201).json(entities);
    },
    delete (req, res) {
        const id = req.params.id;
        const pin = db.get(id);
        if (pin) {
          db.delete(id);
          return res.status(200).json(pin);
        }
        return res.status(404).json({ error: "pin not found" });
    },
    update (req, res) {
        const id = req.params.id;
        const pin = db.get(id);
        if (pin) {
          const body = req.body;
          db.update(id, body);
          return res.status(200).json(body);
        }
        return res.status(404).json({ error: "pin not found" });
    }
};

module.exports = pinsController;