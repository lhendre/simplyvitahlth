var express = require('express')
  , router = express.Router()
var  Web3 = require('web3')
var web3 = new Web3()
var Tx=require("ethereumjs-tx")
var privateKey1=new Buffer('90caae63a16629e0a08f69c5a2fdcff91b98ab25','hex')
var privateKey2=new Buffer('4973e7f375b13626eb2bb2ddbb1f2a9475596b73','hex')

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8101'))

router.get('/store', function(req, res){

  var sender='Doctor1';
  var reciever='Doctor2';
  var toAddr=''
  if(sender=='Doctor1')
    toAddr='0x4973e7f375b13626eb2bb2ddbb1f2a9475596b73'
  else {
    toAddr='0x90caae63a16629e0a08f69c5a2fdcff91b98ab25'
  }

  var rawTx={
    nonce:'0x00',
    gasPrice:'0x09184e72a000',
    gasLimit:'0x2710',
    to:toAddr,
    value:'0',
    data:'0x1111111'
  }

  var tx= new Tx(rawTx);
  if(sender=="Doctor1")
      tx.sign(privateKey1);
  else {
      tx.sign(privateKey2);
  }
  var serializedTx=tx.serialize();
  console.log(serializedTx.toString('hex'));
  web3.eth.sendRawTransaction(serializedTx.toString('hex'), function(err,has){
    if(!err){
      console.log(hash);
      console.log(web3.eth.getTransaction(hash));
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

  res.send('')
})

router.get('/test', function(req, res){
   coinbase=web3.eth.coinbase;
  var balance= web3.eth.getBalance(coinbase);
  console.log(coinbase);
  console.log(balance);
  console.log(web3.eth.getBalance(web3.eth.accounts[3]).toNumber())
  console.log(web3.eth.getBalance(web3.eth.accounts[2]).toNumber())

  res.send('')
})

module.exports=router
