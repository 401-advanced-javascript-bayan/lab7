'use strict';
const express = require('espress');
const app = express();
// cont PORT = process.env.PORT ||3000;
// app.listen(PORT,()=>{
//   console.log(`listening on ${PORT}`);
// });
//  my data as json format
app.use(express.json());
///////routers//////
//middleware apps
app.use(timeStamp);
app.use(logger);
let model= new Model;
///////////// /////////////basic routing/////////////////////
//////// categories route
app.get('/categories', (req, res) => {
  console.log('req.query : ', req.query);
  
  let output = {
    type: req.query.type,
  };
  res.status(200).json(output);
}); 
  
app.post('/categories', (req, res) => {
  console.log('req.body : ', req.body);
  res.status(201).json('  categories ');
  
}); 
/////////// Products Basic Routes 
app.get('/products', (req, res) => {
  console.log('req.query : ', req.query);
  
  let output = {
    type: req.query.type,
  };
  res.status(200).json(output);
});  
  
app.post('/products', (req, res) => {
  console.log('req.body : ', req.body);
  res.status(201).json(' items in Products ');
  
});  
//////////////////////////////////////Middle Ware //////////////////////////////////
  

function timestamp() {
  return (req, res, next) => {
    const newDate = new Date();              
    const newTime = new Date().toLocaleTimeString('en-US');
    req.requestTime = newDate + '  ' + newTime;
    next();
  };
  
} 
  
app.get('/timestamp', timestamp(), (req, res) => {
  let output = {
    requestTime: req.requestTime,
  };
  res.status(200).json(output);
  
}); 
//////////////////////////// error ///////////////////
  
function errorHander(error, req, res, next) {
  res.status(500);
  res.statusMessage = 'Opps Error ';
  res.json({ error: error });
} 
  
function notFoucnError(req, res, next) {
  res.status(404);
  res.statusMessage = ' Not Found ';
  res.json({ error: ' Not Found ' });
} 
  
app.get('/error', (req, res) => {
  throw new Error(' Real-Time Error ');
});
////////////////////////// API//////////////////////
  
let db = [];

////////////////// categories API Route
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


/////////////////////// Products API Route

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