const express = require("express");
const router = express.Router();
const db = require("../connection");
const {validateToken} = require("../middlewares/AuthMiddleware");

// 登録したアクション一覧を取得
router.get("/", validateToken, (req, res) => {
  const userId = req.user.id;
  const sqlSelect = `SELECT * FROM ActionItem WHERE user_id='${userId}'`
  db.getConnection((err, connection) => {
    connection.query(sqlSelect, (err, result) => {
      res.json(result);
      connection.release();
    });
  });
});

// 指定したアクションを取得
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sqlSelect = `SELECT * FROM ActionItem WHERE id=${id}`
  db.getConnection((err, connection) => {
    connection.query(sqlSelect, (err, result) =>{
      res.json(result);
      connection.release();
    });
  });
});

// 新規アクション追加
router.post("/", validateToken , (req, res) => {
  const name = req.body.item_name;
  const color = req.body.color;
  const userId = req.user.id;
  const sqlInsert = "INSERT INTO ActionItem (user_id, item_name, color) VALUES (?, ?, ?)";
  db.getConnection((err, connection) => {
    connection.query(sqlInsert, [userId, name, color], (err, result) =>{
      res.json(result);
      connection.release();
    });
  });
});

// アクションを編集
router.put("/", (req, res) => {
  const id = req.body.id;
  const name = req.body.item_name;
  const color = req.body.color;
  const sqlUpdate = "UPDATE ActionItem SET item_name=?, color=? WHERE id=?";
  db.getConnection((err, connection) => {
    connection.query(sqlUpdate, [name, color, id], (err, result) =>{
      res.json(result);
      connection.release();
    });
  });
});

// アクションを削除
router.delete("/", (req, res) => {
  const id = req.body.id;
  const sqlDelete = "DELETE FROM ActionItem WHERE id=?";
  db.getConnection((err, connection) => {
    connection.query(sqlDelete, [id], (err, result) =>{
      res.json(result);
      connection.release();
    });
  });
});

module.exports = router;