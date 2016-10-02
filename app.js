// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
completedTransactions=[];

var router = express.Router();
var Web3 = require('web3');
var web3 = new Web3();
var Tx=require("ethereumjs-tx")
var privateKey1=new Buffer('caf65a98d49d62f7db0dcb0e283af50c0597143a4c2c4c63c8aaa88bc55a30dd','hex')
var privateKey2=new Buffer('068bc17c28a6697ba159e8bc34907938609278efa9f589498be9acdbffa6f335','hex')

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8101'))


var filter=web3.eth.filter('pending')
filter.watch(function(error, log){
  if(!error){
  console.log('filter')
  console.log(log)
  console.log(error)
  console.log('here')
  var result=web3.eth.getTransaction(log);
  console.log(result)
  console.log(result.input)
  console.log('buf')
  var toHex= result.input;
  toHex=toHex.replace("0x","")
  console.log(toHex);
  var buffer= new Buffer(toHex,'hex');
  console.log(buffer)
  console.log('buf2')
  var dataR= buffer.toString('ascii');
  console.log(dataR);
  console.log('here2')
}


})


// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // use either jade or ejs
// instruct express to server up static assets
app.use(express.static('public'));


// set routes
app.get('/', function(req, res) {
  res.render('index');
});
app.use('/blockchain',require('./controllers/blockchain'));
// Set server port
app.listen(4000);
console.log('server is running');
