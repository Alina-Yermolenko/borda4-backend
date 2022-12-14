const Board = require("../models/boardModel");
const User = require("../models/userModel");
const { ObjectID } = require("bson");

const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.user.userId })

    return res.status(200).json(
      {
        boards: boards
      }
    )

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

const createBoard = async (req, res) => {
  let user = await User.findOne({ "_id": ObjectID(req.user.userId) });

  if (user) {
    let userBoards = new Board({
      _id: user.userId,
      userId: user._id,
      created_by: user._id,
      title: req.body.title,
      description: req.body.description,
      createdDate: Date.now(),
    });

    let boards = await Board.find({ "userId": ObjectID(req.user.userId) })
    return userBoards.save()
      .then(saved => console.log(saved))
      .then(
        res.status(200).send({ ...userBoards })
      )
      .catch(err => {
        console.log(err)
      })
  }
  if (!user) {
    res.status(400).send({ "message": `User doesn't exist` })
  } else {
    res.status(500).send({ "message": `server error` })
  }
}

const getBoardById = async (req, res) => {
  try {
    let singleBoard = await Board.findOne({ "_id": ObjectID(req.params.id) });

    if (singleBoard) {
      res.status(200).send({
        singleBoard: singleBoard,
      })
    }
    if (!singleBoard) {
      res.status(400).send({ "message": `Item doesn't exist` })
    }
  } catch (err) {
    res.status(500).send({ "message": `server error` })
  }
}

const updateBoardById = async (req, res) => {
  try {
    if (req.body.title.length <= 0) {
      return res.status(400).json({ 'message': 'No title' });
    }
    if (req.body.title.length > 0) {
      let board = await Board.findOneAndUpdate({ "_id": ObjectID(req.params.id) }, { "title": req.body.title });
      return res.status(200).json({ 'message': 'Board title changed successfully' })
    }
  } catch (err) {
    return res.status(500).json({ 'message': 'Error' });
  }

}

const deleteBoardById = async (req, res) => {
  try {
    let board = await Board.collection.deleteOne({ "_id": ObjectID(req.params.id) });

    if (board) {
      return res.status(200).send({ "message": "Board deleted successfully" })
    }
    if (!board) {
      return res.status(400).send({ "message": `Board doesn't exist` })
    }
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ "message": `Server error` })
  }
}


module.exports = {
  getBoards,
  createBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById,
};
