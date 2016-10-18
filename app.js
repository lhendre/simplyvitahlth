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
var storage=[
    {
      "date": "2011/04/25",
      "name": "Joe Ziggeler",
      "notes": "Doing great, gave new meds, alergies galore",
      "provider": "Michael Bones MD",
      "procedure": "Evaluation & Management",
      "practice": "Bones Orthopaedics",
      "specialty": "Orthopaedic surgery",
      "priority": 1
    }, {
      "date": "2011/05/05",
      "name": "Joe Ziggeler",
      "notes": "Range of movement: 50 degrees",
      "provider": "Dom Delaney DPT",
      "procedure": "Physical Therapy Evaluation",
      "practice": "Select Physical Therapy",
      "specialty": "Physical Therapy",
      "priority": 2
    }, {
      "date": "2011/05/21",
      "name": "Joe Ziggeler",
      "notes": "Squats, hip flexor streches",
      "provider": "Richard Sanchez DPT",
      "procedure": "Therapeutic Exercise",
      "practice": "Select Physical Therapy",
      "specialty": "Physical Therapy",
      "priority": 3
    }, {
      "date": "2011/05/26",
      "name": "Joe Ziggeler",
      "notes": "Injection complete. Follow up in 5 days.",
      "provider": "Michael Bones MD",
      "procedure": "Intra-articular Injection",
      "practice": "Bones Orthopaedics",
      "specialty": "Orthopaedic Surgery",
      "priority": 4
     }, {
      "date": "2011/05/31",
      "name": "Joe Ziggeler",
      "notes": "Surgery Consult: Surg fo sho",
      "provider": "Michael Bones MD",
      "procedure": "Evaluation & Management",
      "practice": "Bones Orthopaedics",
      "specialty": "Orthopaedic Surgery",
      "priority": 5
     }]
// web3.setProvider(new web3.providers.HttpProvider('http://localhost:8101'))

// var somecontractContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"recipient","type":"address"}],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"DepositMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"msg","type":"string"}],"name":"WithdrawalMade","type":"event"}]);
// var somecontract = somecontractContract.new(
//    {
//      from: web3.eth.accounts[0],
//      data: '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b6103e38061003f6000396000f360606040523615610047576000357c010000000000000000000000000000000000000000000000000000000090048062f714ce146102555780638da5cb5b1461027b57610047565b34610002576102535b7fd15c9547ea5c06670c0010ce19bc32d54682a4b3801ece7f3ab0c3f17106b4bb3334604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1600160005080548060010182818154818355818115116101565781836000526020600020918201910161015591906100d8565b80821115610151576000818150805460018160011615610100020316600290046000825580601f1061010a5750610147565b601f0160209004906000526020600020908101906101469190610128565b808211156101425760008181506000905550600101610128565b5090565b5b50506001016100d8565b5090565b5b5050509190906000526020600020900160005b604060405190810160405280600881526020017f6d73672e6461746100000000000000000000000000000000000000000000000081526020015090919091509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101f157805160ff1916838001178555610222565b82800160010185558215610222579182015b82811115610221578251826000505591602001919060010190610203565b5b50905061024d919061022f565b80821115610249576000818150600090555060010161022f565b5090565b5050505b565b005b346100025761027960048080359060200190919080359060200190919050506102b9565b005b346100025761028d60048050506103bd565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b7f644f4a2c4ef25b5f7c508bd2e57816eab1223aab9a83b089046f27d015a54e03336001600050600160016000508054905003815481101561000257906000526020600020900160005b50604051808373ffffffffffffffffffffffffffffffffffffffff168152602001806020018281038252838181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156103a95780601f1061037e576101008083540402835291602001916103a9565b820191906000526020600020905b81548152906001019060200180831161038c57829003601f168201915b5050935050505060405180910390a15b5050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156',
//      gas: 4700000
//    }, function (e, contract){
//     console.log(e, contract);
//     if (typeof contract.address !== 'undefined') {
//          console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
//     }
//  })

 // var filter = web3.eth.filter({fromBlock:0, toBlock: 'latest', address: contractAddress, 'topics':['0x' + web3.sha3('WithdrawalMade(hexstring,string)')]});
 // filter.watch(function(error, result) {
 //    if(!error) console.log();
 // })

console.log(__dirname);

// var filter=web3.eth.filter('pending')
// filter.watch(function(error, log){

//   if(!error){
//   console.log('filter')
//   console.log(log)
//   console.log(error)
//   console.log('here')
//   var result=web3.eth.getTransaction(log);
//   console.log(result)
//   console.log(result.input)
//   console.log('buf')
//   var toHex= result.input;
//   toHex=toHex.replace("0x","")
//   console.log(toHex);
//   var buffer= new Buffer(toHex,'hex');
//   console.log(buffer)
//   console.log('buf2')
//   var dataR= buffer.toString('ascii');
//   console.log(dataR);
//   console.log('here2')
//   storage.push(JSON.parse(dataR));
// }


// })

var expressWs = require('express-ws')(app);
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine', 'ejs'); // use either jade or ejs
// instruct express to server up static assets
app.use(express.static('public'));


// set routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get("/visits", function(req, res) {
  // var data = {
  //   "data": [
  //     {
  //       "date": "2011/04/25",
  //       "name": "Joe Ziggeler",
  //       "notes": "Doing great, gave new meds, alergies galore",
  //       "provider": "Bones Orthopaedics",
  //       "procedure": "Evaluation & Management",
  //       "practice": "Michael Bones MD",
  //       "specialty": "Orthopaedic surgery",
  //       "priority": 1
  //     }
  //   ]
  // }
  console.log(storage);
  res.send(storage);
});

app.post('/visits', function(req, res) {
    var visit = req.body;
    console.log("Received: ", visit);
    res.send(visit);
});

app.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    ws.send('Pong ' + msg);
  });
});

app.use('/blockchain',require('./controllers/blockchain'));
// Set server port
app.listen(4000);
console.log('server is running');
