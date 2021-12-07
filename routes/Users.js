const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../connection");
const {sign} = require("jsonwebtoken");

// サインアップ処理
router.post("/signup", (req, res) => {
  const {username, password} = req.body;
  const sqlSelect = `SELECT * FROM Users WHERE username='${username}'`;
  db.getConnection((err, connection) => {
    connection.query(sqlSelect, (err_s, result_s) => {
      if (result_s.length === 0) {
        const sqlInsert = "INSERT INTO Users (username, password) VALUES (?, ?)";
        bcrypt.hash(password, 10).then((hash) => {
          connection.query(sqlInsert, [username, hash], (err_i, result_i) => {
            if(err_i) console.log(err_i);
          });
        });
        res.send(true);
      } else {
        res.send(false);
      }
      connection.release();
    });
  });
});

// ログイン処理
router.post("/login", (req, res) => {
  const {username, password} = req.body;
  const sqlSelect = `SELECT * FROM Users WHERE username='${username}'`;
  db.getConnection((err, connection) => {
    connection.query(sqlSelect, (err, result) => {
      if(result.length !==0) {
        bcrypt.compare(password, result[0].password).then((match) => {
          if (!match) {
            res.json({auth: false});
          } else {
            const accessToken = sign(
              {username: result[0].username, id: result[0].id},
              "importantsecret",
            );
            res.json({auth: true, token: accessToken});
          }
        });
      } else {
        res.json({message: "該当するユーザーが見つかりません"});
      }
      connection.release();
    });
  });
});

module.exports = router;