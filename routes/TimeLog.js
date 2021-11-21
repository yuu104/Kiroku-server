const express = require("express");
const router = express.Router();
const db = require("../connection");
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, (req, res) => {
  const sqlSelect = "SELECT * FROM Time WHERE user_id=? AND finish_time IS NULL";
  db.getConnection((err, connection) => {
    connection.query(sqlSelect, [req.user.id], (err, result) => {
      res.json(result);
      connection.release();
    });
  });
});

router.get("/timeChart/:dateString", validateToken, (req, res) => {
  const sqlSelect = `SELECT * FROM Time WHERE user_id=? AND finish_time IS NOT NULL AND (start_time LIKE '${req.params.dateString}%' OR finish_time LIKE '${req.params.dateString}%')`;
  db.getConnection((err, connection) => {
    connection.query(sqlSelect, [req.user.id], (err, result) => {
      res.json(result);
      connection.release();
    });
  });
});

router.post("/start", validateToken, (req, res) => {
  const itemName = req.body.item_name;
  const color = req.body.color;
  const startTime = req.body.start_time;
  const userId = req.user.id;
  const sqlInsert = "INSERT INTO Time (user_id, item_name, color , start_time) VALUES (?, ?, ?, ?)";
  db.getConnection((err, connection) => {
    connection.query(sqlInsert, [userId, itemName, color, startTime], (err, result) => {
      res.json(result);
      connection.release();
    });
  });
});

router.post("/stop", validateToken, (req, res) => {
  const id = req.body.id;
  const finishTime = req.body.finish_time;
  const sqlUpdate = "UPDATE Time SET finish_time=? WHERE id=?";
  db.getConnection((err, connection) => {
    connection.query(sqlUpdate, [finishTime, id], (err, result) => {
      res.json(result);
      connection.release();
    });
  });
});

router.post("/add", validateToken, (req, res) => {
  const userId = req.user.id;
  const itemName = req.body.item_name;
  const color = req.body.color;
  const startTime = req.body.start_time;
  const finishTime = req.body.finish_time;
  const sqlInsert = "INSERT INTO Time (user_id, item_name, color, start_time, finish_time) VALUES (?, ?, ?, ?, ?)";
  db.getConnection((err, connection) => {
    connection.query(sqlInsert, [userId, itemName, color, startTime, finishTime], (err, result) => {
      res.json(result);
      connection.release();
    });
  });
});

router.put("/edit", (req, res) => {
  const id = req.body.id;
  const startTime = req.body.start_time;
  const finishTime = req.body.finish_time;
  const sqlUpdate = "UPDATE Time SET start_time=?, finish_time=? WHERE id=?";
  db.getConnection((err, connection) => {
    connection.query(sqlUpdate, [startTime, finishTime, id], (err, result) => {
      res.json(result);
      connection.release();
    });
  });
});

router.delete("/delete", (req, res) => {
  const id = req.body.id;
  const sqlDelete = "DELETE FROM Time WHERE id=?";
  db.getConnection((err, connection) => {
    connection.query(sqlDelete, [id], (err, result) => {
      res.json(result);
      connection.release();
    });
  });
});

module.exports = router;