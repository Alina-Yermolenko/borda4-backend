const express = require('express');
const router = express.Router();

const { getUser  } = require("./controllers/user");
const { getBoards, getBoardById, updateBoardById, deleteBoardById, createBoard } = require("./controllers/boards");
const { getItems, createItem, updateItemById, deleteItemById, updateList, archiveItemById } = require("./controllers/items");
const { registerUser, loginUser, helloWorld } = require("./controllers/auth");

router.post('/', helloWorld);

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.get('/users/me', getUser);


router.get('/boards', getBoards);
router.post('/boards', createBoard);
router.get('/boards/:id', getBoardById);
router.put('/boards/:id', updateBoardById);
router.delete('/boards/:id', deleteBoardById);


router.get('/items/:id', getItems);
router.post('/items/:id', createItem);
router.put('/items/:id', updateItemById);
router.put('/items', updateList);
router.delete('/items/:id', deleteItemById);
router.patch('/items/:id', archiveItemById);
// router.get('/items/:id', getItemById);
// router.get('/loads/active', getActiveLoads);//driver
// router.patch('/loads/active/state', changeLoadState);//driver
// router.get('/loads/:id', getLoadById);//shipper and driver
// router.put('/loads/:id', updateLoadById);//shipper
// router.delete('/loads/:id', deleteLoadById);//shipper
// router.post('/loads/:id/post', postLoad);//shipper
// router.get('/loads/:id/shipping_info', getShippingInfo);//shipper



module.exports = {
  filesRouter: router
};

