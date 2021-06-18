const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json("Forbidden.");
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
    if (err) {
      return res.status(401).json(err);
    }

    return next();
  });
};
exports.requireAuthMiddleware = authMiddleware;
