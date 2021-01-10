var express = require('express');
var app = express();
var router=require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
app.use("/",router);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
