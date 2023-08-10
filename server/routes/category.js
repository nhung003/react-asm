var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.get('/', function (req, res, next) {
    try {
        let sql = `SELECT * FROM category`;
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
        let sql = 'SELECT * FROM category WHERE id = ?'
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
        };
    
        const arr = Object.values(data);
        const arrValues = [arr];
    
        let sql = `INSERT INTO category (name) VALUES ?`;
        db.query(sql, [arrValues], (err, d) => {
            if (err) throw err;
            return res.json({ "thongbao": "Đã chèn thành công" });
        });
    } catch (error) {
        return res.status(500).json({ "Thông báo": "Thất bại" });
    }

});

router.put('/:id', function(req, res, next) {
    try {
        const data = {
            id: req.params.id,
            name: req.body.name,
        };
    console.log(data.id);
    
        let sql = 'UPDATE category SET name=? WHERE id=?';
        db.query(sql, [data.name[0], data.id], (err, results) => {
            if (err) throw err;
            return res.status(200).json({"thongbao": 'Đã cập nhật thành công'});
        });
    } catch (error) {
        return res.status(500).json({ "Thông báo": "Thất bại" });
    }
 
});

router.delete('/:id', function(req, res) { 
    try {
        let id = req.params.id;
        let sql = 'DELETE FROM category WHERE id = ?'
        db.query(sql, id , (err, d) => {
            if (err) throw err;
            return res.status(200).json({ "Thông báo": "Đã sửa thành công" });
        }); 
    } catch (error) {
        return res.status(500).json({ "Thông báo": "Thất bại" });
    }
  
});

module.exports = router;

