'use strict';

var express = require('express');
var cors = require('cors');
const multer = require('multer'); // require and use "multer", add files to request object

// require and use "multer"...

const upload = multer();
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next) {
  
  console.log(req.file);
  
  if(req.file) {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  } else {
    next({status: 400, message: 'require file to upload'});
  }
  
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
