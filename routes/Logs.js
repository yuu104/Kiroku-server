const express = require("express");
const router = express.Router();
const db = require("../connection");
const {validateToken} = require("../middlewares/AuthMiddleware");

// 現在記録しているアクションがあるかどうかを調べるためのAPI
router.get("/", validateToken, (req, res) => {
  const sqlSelect = "SELECT * FROM Time WHERE user_id=? AND finish_time IS NULL";
  db.getConnection((err, connection) => {
    connection.query(sqlSelect, [req.user.id], (err, result) => {
      res.json(result);
      connection.release();
    });
  });
});

// 指定日の行動記録データを取得（開始日と終了日が異なるデータも取得）
router.get("/:dateString", validateToken, (req, res) => {
  const sqlSelect = `SELECT * FROM Time WHERE user_id=? AND finish_time IS NOT NULL AND (start_time LIKE '${req.params.dateString}%' OR finish_time LIKE '${req.params.dateString}%')`;
  db.getConnection((err, connection) => {
    connection.query(sqlSelect, [req.user.id], (err, result) => {
      res.json(result);
      connection.release();
    });
  });
});

// // 記録をスタート
// router.post("/start", validateToken, (req, res) => {
//   const itemName = req.body.item_name;
//   const color = req.body.color;
//   const startTime = req.body.start_time;
//   const userId = req.user.id;
//   const sqlInsert = "INSERT INTO Time (user_id, item_name, color , start_time) VALUES (?, ?, ?, ?)";
//   db.getConnection((err, connection) => {
//     connection.query(sqlInsert, [userId, itemName, color, startTime], (err, result) => {
//       res.json(result);
//       connection.release();
//     });
//   });
// });

// 記録を終了して、終了時間を格納する
router.patch("/:id/stop", validateToken, (req, res) => {
  const id = req.params.id;
  const finishTime = req.body.finish_time;
  const sqlUpdate = "UPDATE Time SET finish_time=? WHERE id=?";
  db.getConnection((err, connection) => {
    connection.query(sqlUpdate, [finishTime, id], (err, result) => {
      res.json(result);
      connection.release();
    });
  });
});

// 記録を追加
router.post("/", validateToken, (req, res) => {
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

// 記録の開始時間と終了時間を変更する
router.patch("/:id/edit", (req, res) => {
  const id = req.params.id;
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

// 記録を削除する
router.delete("/", (req, res) => {
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