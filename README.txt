Healthcare is shifting from volume to value, holding physicians accountable for quality, cost, and care coordination. Historically, care coordination was done by providers within the same clinical affiliation. Now, though, unaffiliated community providers and hospital providers are required to work together to manage their shared patients.

Sharing data between care teams is extremely difficult, but necessary to ensure that the correct care pathway is being followed in the right order by the right providers. Our platform allows providers to easily share CCD files with their care teams to coordinate care.

Utilizing blockchain technology helps the providers view authenticated ad non-repudiable records at the same time regardless of clinical affiliation.

Payors can also utilize our platform for real time access to care pathways for audit reasons. They can dig into visit history data to identify why episode costs deviate significantly from average costs.

This is a sample application built for a 24 hour hackathon to demo this.


Some code done by Lucas Hendren was submitted by Katherine Kuzmeskas on behalf of Lucas Hendren.
Lucas Hendren-Initial Setup, Backend, Block Chain, Devops
Katherine Kuzmeskas- Content, PM, Area Specialist
Andrew Pomerance-Front End, Design
Paul Cuciureanu-Front End, Design

Instructions
Git clone the Repo
npm install
Download and install Geth
Go to https://www.myetherwallet.com/
Create two wallets, save all the information and download the keystores
Perform geth -datadir "path" --networkid 12345 init
Go to the data directory and delete everything but the keystore then add the keys you obtained from the wallet to it
After that edit the gensis block with your addresses, delete the extras or create more keys, by adding in the address for the keys you generated earlier and make sure you make the first allocation your keybase, Also  sub out the same corresponding addresses in the controllers/blockchain
now perform geth  --datadir="pathToKeystoreDir"  --networkid 12345 init "pathToGensisBlock"
example
  geth --datadir="/tmp/eth/60/01" init ./config/genesis.json


then exit geth
now launch the ethereum server
geth --dev --datadir="pathToKeystoreDir" --etherbase "coinbase address"  --maxpeers 0 --gasprice 0 --port 0 --shh --networkid 12345 --mine --minerthreads 8  --nodiscover --ipcdisable --port 30301 --rpc  --rpcport 8101 console
example
geth --dev --datadir="/tmp/eth/60/01" --etherbase 0xDDF083793273Dbb490282e09007EEb61020433c8  --maxpeers 0 --gasprice 0 --port 0 --shh --networkid 12345 --mine --minerthreads 8  --nodiscover --ipcdisable --port 30301 --rpc  --rpcport 8101 console

In another terminal go to the project file and perform node app.js
Will demo simple data storage with viewing and shows a smart contract




