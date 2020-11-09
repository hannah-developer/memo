const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/', (req, res) => {
    //req.cookie = 받아올때 외부모듈 cookieParser가 있어야 쓸 수 있다
    db.query(`SELECT memo.userID, email, text, id, color,pageX, pageY FROM memo JOIN user ON memo.userID = user.userID WHERE email = '${req.cookies.email}'`, (err,rows)=>{
        res.send(rows);
    })
})

router.post('/create', (req, res) => {
    db.query(`INSERT INTO MEMO(COLOR, PAGEX, PAGEY) VALUES('${req.body.color}', '${req.body.pageX}', '${req.body.pageY}')`, (err, rows)=>{
        if (err) throw err;
        res.send([{ 
            text:"",
            color:`${req.body.color}`,
            id:rows.insertId,
            pageX:req.body.pageX-200,
            pageY:req.body.pageY                
        }]);
    });
});

router.get('/color', (req,res)=>{
    db.query(`UPDATE MEMO SET COLOR = '${req.query.color}' WHERE ID = ${req.query.id}`, (err)=>{
        if (err) throw err;
        res.send('success');
    })
})

router.get('/position', (req,res)=>{
    db.query(`UPDATE MEMO SET pageX = '${req.query.pageX}', pageY = '${req.query.pageY}' WHERE ID = ${req.query.id}`, (err)=>{
        if (err) throw err;
        res.send('success');
    })
})

router.put('/update', (req, res) => {
    const text = req.body.text;
    const postid = parseInt(req.body.id);
    db.query(`UPDATE MEMO SET TEXT = "${text}" WHERE ID = ${postid}`, (err) =>{
        if (err) throw err;
        res.send('success');
    })
})

router.get('/delete', (req, res)=>{
    db.query(`DELETE FROM MEMO WHERE ID = ${req.query.id}`, (err)=>{
        if (err) throw err;
        res.send('success')
    })
})

router.delete('/all', (req, res)=>{
    db.query(`DELETE FROM MEMO`, (err)=>{
        if (err) throw err;
        res.send('success')
    })
})

router.get('/filter', (req,res)=>{
    db.query(`SELECT * FROM MEMO WHERE COLOR = '${req.query.color}'`, (err,rows)=>{
        if (err) throw err;
        res.send(rows);
    })
})

module.exports = router;