const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routers
const usersRouter = require("./routes/Users");
app.use("/users", usersRouter);
const actionsRouter = require("./routes/Actions");
app.use("/actions", actionsRouter);
const timeLogRouter = require("./routes/Logs");
app.use("/logs", timeLogRouter);
const authRouter = require("./routes/Auth");
app.use("/auth", authRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server running on port 3001");
});

