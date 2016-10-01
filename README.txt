"0xe79ec4cfb61aa5dd0e1000056a3ea8d9cdb53c80"  abcd12345 0
"0x90caae63a16629e0a08f69c5a2fdcff91b98ab25"  Doctor1   1
"0x4973e7f375b13626eb2bb2ddbb1f2a9475596b73"  Doctor2   2





geth --datadir="/tmp/eth/60/01" --etherbase 0 --mine -verbosity 6 --ipcdisable --port 30301 --autodag --rpc  --rpcport 8101 console 2>> /tmp/eth/60/01.log
