var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.get('/', function (req, res, next) {
    try {
        let sql = `SELECT * FROM listusers`;
        db.query(sql, function (err, data) {
            return res.status(200).json(data);

        });
    } catch (error) {
        return res.status(500).json(data);
    }
   
});

router.get('/:id', function (req, res, next) {
    try {
        let id = req.params.id;
        let sql = 'SELECT * FROM listusers WHERE id = ?'
        db.query(sql, id, (err, data) => {
            return res.status(200).json(data[0]);
        });
    } catch (error) {
        return res.status(500).json(data);
    }
   
});

router.post('/', function (req, res, next) {
    try {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
    
        const arr = Object.values(data);
        const arrValues = [arr];
    
        let sql = `INSERT INTO listusers (name, email, password) VALUES ?`;
        db.query(sql, [arrValues], (err, d) => {
            // if (err) throw err;
            return res.status(200).json({ "Thông báo": "Đã chèn thành công" });
        });
    }
    catch (err) {
        return res.status(500).json({ "Thông báo": "Internal server error" });
    }
});

router.post('/login', function (req, res, next) {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password
      };
  
      const arr = Object.values(data);
      let sql = `SELECT * FROM listusers WHERE email = ? AND password = ?`;
      db.query(sql, arr, (err, data) => {
        if (data.length > 0) {
          return res.status(200).json("Success");
        } else {
          return res.status(500).json("Error");
        }
      });
    }
    catch (err) {
      return res.status(500).json("Error");
    }
  });

router.put('/:id', function(req, res, next) {
    try {
        const data = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
    
        let sql = 'UPDATE listusers SET name=?, email=?, password=? WHERE id=?';
        db.query(sql, [data.name, data.email, data.password,  data.id], (err, results) => {
            // if (err) throw err;
            return res.status(200).json(data);
        });
    } catch (error) {
        return res.status(500).json(data);
    }
  
});

router.delete('/:id', function(req, res) { 
    try {
        let id = req.params.id;
        let sql = 'DELETE FROM listusers WHERE id = ?'
        db.query(sql, id , (err, d) => {
            return res.status(200).json({ "Thông báo": "Đã xóa thành công" });
        });
    } catch (error) {
        return res.status(500).json({ "Thông báo": "Internal server error" });
    }
});

module.exports = router;

