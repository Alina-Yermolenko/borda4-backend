const Board = require("../models/boardModel");
const User = require("../models/userModel");
const { ObjectID } = require("bson");

const getItems = async (req, res) => {
    try {
        let singleBoard = await Board.findOne({ "_id": ObjectID(req.params.id) });
        return res.status(200).json(
            {
                singleBoard: singleBoard
            }
        )

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

const createItem = async (req, res) => {
    try {
        let user = await User.findOne({ "_id": ObjectID(req.user.userId) });

        let singleBoard = await Board.findOne({ "_id": ObjectID(req.params.id) });

        if (!user || !singleBoard) {
            const err = { code: 400, message: `User doesn't exist` };
            res.status(err.code).send({ "message": err.message })
            throw err;
        }


        if (user && singleBoard) {
            let item = {
                title: req.body.title,
                createdDate: Date.now(),
                boardId: req.params.id
            };

            singleBoard[req.body.status].push(item)

            const result = await singleBoard.save();
            const singleItem = result[req.body.status].find((item) => {
                return item.title === req.body.title
            })

            if (singleBoard) {
                return res.status(200).send({ "message": singleItem })
            }
            if (!singleBoard) {
                return res.status(400).send({ "message": `Board doesn't exist` })
            }
        }
    } catch (err) {
        if (!err.code) err.code = 500;
        if (!err.message) err.message = `Server error`;
        console.error(err.message);
        res.status(err.code).send({ "message": err.message })
    }
}

const updateItemById = async (req, res) => {
    try {
        let board = await Board.findOne({ "_id": ObjectID(req.body.board._id) });
        let itemToEdit = board[req.body.status].find(el => el._id.toString() === req.params.id.toString());
        itemToEdit.title = req.body.title
        await board.save();

        if (board) {
            return res.status(200).send({ "message": "Task updated successfully" })
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

const updateList = async (req, res) => {
    try {
        let angularBoard = req.body;
        let board = await Board.findOne({ '_id': ObjectID(angularBoard._id) }).exec();
        board.todo = angularBoard.todo;
        board.inProgress = angularBoard.inProgress;
        board.done = angularBoard.done;
        board.archive = angularBoard.archive;

        await board.save();

        return res.status(200).json({ 'message': 'Board changed successfully' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ 'message': 'Error' });
    }

}

const deleteItemById = async (req, res) => {
    try {
        let status = req.body.status + '._id'
        let board = await Board.findOne({ [status]: ObjectID(req.params.id) });
        board[req.body.status] = board[req.body.status].filter(el => el._id.toString() !== req.params.id.toString());

        await board.save();

        if (board) {
            return res.status(200).send({ "message": "Item deleted successfully" })
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

const archiveItemById = async (req, res) => {
    try {
        let status = req.body.status + '._id';
        let board = await Board.findOne({ [status]: ObjectID(req.params.id) });
        let itemToArchive = board[req.body.status].find(el => el._id.toString() === req.params.id.toString());
        board.archive.push(itemToArchive)

        await board.save();

        if (board) {
            return res.status(200).send({ "message": "Item deleted successfully" })
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
    getItems,
    createItem,
    updateItemById,
    updateList,
    deleteItemById,
    archiveItemById
};
