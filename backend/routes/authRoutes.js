const express = require("express");
const {signUp, signIn, updateAccount, deleteAccount , logOut } = require("../controllers/auth.controller.js");
const verifyToken = require("../utils/verifyUser.js");
const { updateUser } = require("../controllers/user.controller.js");

const authRouter = express.Router();

authRouter.post('/backenda/api/signUp', signUp);
authRouter.post('/backend/api/signIn', signIn);
authRouter.put('/backend/api/updateAccount/:userId', verifyToken, updateAccount);
authRouter.delete('/backend/api/deleteAccount/:userId', verifyToken, deleteAccount);
authRouter.post('/backend/api/logOut', logOut);

module.exports = authRouter;