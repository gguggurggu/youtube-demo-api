const express = require("express");
const app = express();

app.listen(3000);

const userRouter = require("./routes/users.js");
const channelRouter = require("./routes/channels.js");

app.use("/", userRouter);
app.use("/channels", channelRouter);
