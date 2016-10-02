var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var web3 = new Web3();
var Tx=require("ethereumjs-tx")
var privateKey1=new Buffer('caf65a98d49d62f7db0dcb0e283af50c0597143a4c2c4c63c8aaa88bc55a30dd','hex')
var privateKey2=new Buffer('068bc17c28a6697ba159e8bc34907938609278efa9f589498be9acdbffa6f335','hex')

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8101'))

function handleError(res, reason, message, code) {
  console.error("ERROR: " + reason);
  res.status(code || 500).json({
    "error": message
  });
}

router.get('/store', function(req, res){
  var data= "contract test{\n"+
              "uint x=255;\n"+
              "}\n";

  var sender='Doctor1';
  var reciever='Doctor2';
  var toAddr=''
  if(sender=='Doctor1')
    toAddr='0x4973e7f375b13626eb2bb2ddbb1f2a9475596b73'
  else {
    toAddr='0x90caae63a16629e0a08f69c5a2fdcff91b98ab25'
  }
  var gasPriceHex=web3.toHex(web3.eth.gasPrice);
  var gasLimit=web3.toHex(300000);
  var string=" test test test test";
  var buf=new Buffer(string);
  var hexData='0x'+buf.toString('hex');
  var non=web3.eth.getTransactionCount("0xDDF083793273Dbb490282e09007EEb61020433c8")
  console.log(non);
  var rawTx={
    nonce:non,
    gasPrice:gasPriceHex,
    gasLimit:gasLimit,
    to:toAddr,
    value:'1',
    data:hexData
  }

  var tx= new Tx(rawTx);
  if(sender=="Doctor1")
      tx.sign(privateKey1);
  else {
      tx.sign(privateKey2);
  }
  var serializedTx=tx.serialize();

  web3.eth.sendRawTransaction(serializedTx.toString('hex'), function(err,hash){
    console.log('inside')
    if(!err){
      console.log(hash);
      var result=web3.eth.getTransaction(hash);
      var toHex= result.input;
      console.log(toHex);
      toHex=toHex.replace("0x","")
      var buffer= new Buffer(toHex,'hex');
      var dataR= buffer.toString('ascii');
      console.log(dataR);
    }
    else {
        console.log(err)
    }

  });
  res.send('')
})

router.get('/retrieve', function(req, res){


  res.send('')
})

router.get('/createContract', function(req, res){

  res.send('')
})

router.get('/triggerContract', function(req, res){

  res.send('');
})

router.get('/test', function(req, res){
   coinbase=web3.eth.coinbase;
   console.log(coinbase);
  var balance= web3.eth.getBalance(web3.eth.accounts[0]).toNumber();
  console.log(web3.eth.getBalance(web3.eth.accounts[1]).toNumber());

  console.log(web3.eth.getBalance(web3.eth.accounts[2]).toNumber());
  console.log(web3.eth.getBalance(web3.eth.accounts[3]).toNumber());
  console.log(web3.eth.getBalance(web3.eth.accounts[4]).toNumber());
  console.log(web3.eth.getBalance(web3.eth.accounts[5]).toNumber())
  console.log('here')
  console.log(balance);
  res.send('');
})

module.exports = router;
