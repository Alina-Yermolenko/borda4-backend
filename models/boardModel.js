const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  created_by: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdDate: {
    type: String,
    default: Date.now(),
  },
  todo: [
    {
      title: {
        type: String,
        default: ' ',
      },
      createdDate: {
        type: Date,
        default: Date.now(),
        required: true,
      },
      boardId: {
        type: String,
      },
      comments: [],
    },
  ],
  done: [
    {
      title: {
        type: String,
        default: ' '
      },
      createdDate: {
        type: Date,
        default: Date.now(),
        required: true,
      },
      boardId: {
        type: String,
      },
      comments: [
      ],
    }
  ],
  inProgress: [
    {
      title: {
        type: String,
        default: ' ',
      },
      createdDate: {
        type: Date,
        default: Date.now(),
        required: true,
      },
      boardId: {
        type: String,
      },
      comments: [],
    }
  ],
  archive: [
    {
      title: {
        type: String,
        required: true,
      },
      createdDate: {
        type: Date,
        default: Date.now(),
        required: true,
      },
      boardId: {
        type: String,
      },
      comments: [],
    }
  ],
});

module.exports = mongoose.model("Boards", BoardSchema);
