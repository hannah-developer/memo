const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/', (req,res)=>{
    db.query(`SELECT * FROM user`, (err,rows)=>{
        res.send(rows)
    })
})

router.post('/login', (req, res)=>{
    console.log(req.body)
    db.query(`SELECT COUNT(*) as count FROM user WHERE email = '${req.body.email}' and password = '${req.body.password}'`, (err,rows)=>{ 
        if(rows[0].count === 0){
            res.redirect('/login.html')
        } else {
            res.redirect('/index.html')
            res.set('Set-Cookie', [`username=${req.body.email}`,`password=${req.body.password}`])}

    })
  });



// router.get('/my', (req,res)=>{
//     db.query(`SELECT * FROM user`, (err,rows)=>{
//         res.send(rows)
//     })
// })


module.exports = router;
