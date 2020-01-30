'use strict';

const express = require('express');

// let server use express lib 
const app = express();
const loggerReq = require('./logger.js');

app.use(loggerReq);

// any data will be in json format if it's an object 
app.use(express.json());
///////// Errors //////////

function errorHander(error, req, res, next) {
  res.status(500);
  res.statusMsg = 'Server Error ';
  res.json({ error: error });
}

function notFoucnError(req, res, next) {
  res.status(404);
  res.statusMsg = ' Not Found ';
  res.json({ error: ' Not Found ' });
} 

app.get('/error', (req, res) => {
  throw new Error(' Real-Error ');
}); 
/////////////// Basic Routes ///////////
// categories Basic Routes 

app.get('/categories', (req, res) => {
  console.log('req.query : ', req.query);

  let output = {
    type: req.query.type,
  };
  res.status(200).json(output);
}); 

app.post('/categories', (req, res) => {
  console.log('req.body : ', req.body);
  res.status(201).json(' item added  ');

}); 

// Products Basic Routes 
app.get('/products', (req, res) => {
  console.log('req.query : ', req.query);

  let output = {
    type: req.query.type,
  };
  res.status(200).json(output);
}); 

app.post('/products', (req, res) => {
  console.log('req.body : ', req.body);
  res.status(201).json(' item added ');

});  

///////////// Middle Ware ///////////////

function timestamp() {
  return (req, res, next) => {
    const date = new Date().toLocaleDateString('en-US');     
    const time = new Date().toLocaleTimeString('en-US');
    req.requestTime = date + '  ' + time;
    console.log('req.requestTime : ', req.requestTime);
    next();
  };

} 

app.get('/middWare', timestamp(), (req, res) => {
  let output = {
    requestTime: req.requestTime,
  };
  res.status(200).json(output);

}); 
////////// API Routes///////////////

let db = [];

// categories API Routes 
app.get('/api/v1/categories', timestamp(), (req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
});  

app.get('/api/v1/categories/:id', timestamp(), (req, res, next) => {
  let id = req.params.id;
  let record = db.filter(record => record.id === parseInt(id));
  res.json(record);
}); 

app.post('/api/v1/categories', timestamp(), (req, res, next) => {
  let { name } = req.body;
  let record = { name };
  record.id = db.length + 1;
  db.push(record);
  res.json(record);
}); 

app.put('/api/v1/categories/:id', timestamp(), (req, res, next) => {
  let idUpdate = req.params.id;
  let { name, id } = req.body;
  let recordUpdate = { name, id };
  db = db.map((record) => (record.id === parseInt(idUpdate)) ? recordUpdate : record);
  res.json(recordUpdate);
}); 

app.delete('/api/v1/categories/:id', timestamp(), (req, res, next) => {
  let idDelete = req.params.id;
  db = db.filter(record => record.id !== parseInt(idDelete));
  res.json({ message: ' Item Deleted' });
}); 




app.get('/api/v1/products', timestamp(), (req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
});  

app.get('/api/v1/products/:id', timestamp(), (req, res, next) => {
  let id = req.params.id;
  let record = db.filter(record => record.id === parseInt(id));
  res.json(record);
}); 

app.post('/api/v1/products', timestamp(), (req, res, next) => {
  let { name } = req.body;
  let record = { name };
  record.id = db.length + 1;
  db.push(record);
  res.json(record);
}); 

app.put('/api/v1/products/:id', timestamp(), (req, res, next) => {
  let idUpdate = req.params.id;
  let { name, id } = req.body;
  let recordUpdate = { name, id };
  db = db.map((record) => (record.id === parseInt(idUpdate)) ? recordUpdate : record);
  res.json(recordUpdate);
});  

app.delete('/api/v1/products/:id', timestamp(), (req, res, next) => {
  let idDelete = req.params.id;
  db = db.filter(record => record.id !== parseInt(idDelete));
  res.json({ message: ' Item Deleted' });
}); 


module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(` listening on port No.${PORT}`));
  },
};