// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var expressWs = require('express-ws')(app);
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // use either jade or ejs
// instruct express to server up static assets
app.use(express.static('public'));


// set routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get("/visits", function(req, res) {
  var visitsArray = {
    "data": [
      {
        "date": "2011/04/25",
        "name": "Joe Ziggeler",
        "notes": "Doing great, gave new meds, alergies galore",
        "provider": "Bones Orthopaedics",
        "procedure": "Evaluation & Management",
        "practice": "Michael Bones MD",
        "specialty": "Orthopaedic surgery",
        "priority": 1
      }
    ]
  }
  res.send(visitsArray);
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
