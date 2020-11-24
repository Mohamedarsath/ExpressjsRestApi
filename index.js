const mysql = require('mysql');
const express = require('express');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.json();
const app = express();
const port = 3000;
const db_con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users',
  multipleStatements: true,
});
db_con.connect(function (err) {
  if (err) throw err;
  console.log('Database Connected');
});

//
app.post('/userinsert', urlencodedParser, (req, res) => {
  const email = req.body.email;
  const phoneno = req.body.phoneno;
  const address = req.body.address;
  const gender = req.body.gender;

  db_con.query(
    'INSERT INTO usertable(email,phoneno,address,gender) VALUES(?,?,?,?)',
    [email, phoneno, address, gender],
    (err, result) => {
      if (err) console.log(err);
    }
  );
  res.send('user added');
});

app.get('/userlist', urlencodedParser, (req, res) => {
  db_con.query('SELECT * FROM usertable', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get('/userlist/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  db_con.query('SELECT * FROM usertable WHERE id=?', [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/userupdate', urlencodedParser, (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const phoneno = req.body.phoneno;
  const address = req.body.address;
  const gender = req.body.gender;

  db_con.query(
    'UPDATE usertable SET email=?,phoneno=?,address=?,gender=? WHERE id=?',
    [email, phoneno, address, gender, id],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});
app.post('/userdelete', urlencodedParser, (req, res) => {
  const id = req.body.id;
  db_con.query('DELETE FROM usertable WHERE id=?', [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
app.listen(port, () => console.log('server is running'));
