const mongoose = require("mongoose");

// Define model schema
const boardModelSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  title: String,
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  ],
});

const boardModel = mongoose.model("BoardModel", boardModelSchema);

const create = async (board) => {
  const boardCreated = await boardModel.create(board);
  return boardCreated;
};

const getAll = async () => {
  const boards = await boardModel.find().populate("author");
  return boards;
};

const search = async (query) => {
  return await boardModel.find(query);
};

module.exports = {
  create,
  getAll,
  search,
};
