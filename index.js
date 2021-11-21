const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routers
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const actionsRouter = require("./routes/Actions");
app.use("/actions", actionsRouter);
const timeLogRouter = require("./routes/TimeLog");
app.use("/timeLog", timeLogRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server running on port 3001");
});

