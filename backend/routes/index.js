const express = require('express');
const userRouter = require("./user")
const app =express();
const router = express.Router();

app.use("/user", userRouter);
module.exports = router;