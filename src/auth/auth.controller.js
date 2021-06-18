const userModel = require("../user/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const user = await userModel.search({
    email: req.body.email,
  });

  if (user) {
    const result = await bcrypt.compare(req.body.password, user.password);

    if (result) {
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
      return res.json(token);
    } else {
      return res.status(401).json("Wrong email or password.");
    }
  }

  return res.status(401).json("Wrong email or password.");
};

module.exports = {
  login,
};
