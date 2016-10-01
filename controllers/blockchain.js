var express = require('express')
  , router = express.Router()
var  Web3 = require('web3')
var web3 = new Web3()

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8101'))

router.post('/store', function(req, res){

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
   console.log(coinbase);
  var balance= web3.eth.getBalance(coinbase);
  console.log(coinbase);
  console.log(balance);
  res.send('')
})

module.exports=router
