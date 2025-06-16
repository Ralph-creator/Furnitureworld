const express = require('express');
const userRouter = express.Router();
const {createUser, getUsers,getUser,updateUser,deleteUser} = require('../controllers/user.controller');

userRouter.post("/backend/api/createUser", createUser);
userRouter.get("/backend/api/getUsers", getUsers);
userRouter.get("/backend/api/getUser/:id", getUser);
userRouter.put("/backend/api/updateUser/:id", updateUser);
userRouter.delete("/backend/api/deleteUser/:id", deleteUser);

module.exports = userRouter;