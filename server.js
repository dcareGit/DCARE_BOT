/**
 * NSC Project 2018
 * Depression Detection Chatbot
 * by Student's KMUTT
 */

//start to connect network
var express = require("express");
var app = express();

//connect port
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Server start on port : " + port);

//connect firebase
var admin = require("firebase-admin");
var serviceAccount = require("./etc/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dcarebotx-192914.firebaseio.com"
});
var database = admin.database();
var ref = database.ref("message/");

///////////////////////////////////////////////////////////////////

//GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});

//GET user data from chatfuel to firebase
app.get('/api/user', function(req,res){
  //get data
  var user_fb_id = req.param('userIn');
  var name = req.param('nameIn');
  var gender = req.param('genderIn');

  //var age = req.param('user')
  //write data
  database.ref('user/'+user_fb_id).set({
    userId: user_fb_id,
    name : name ,
    gender: gender
    //age : age
  });
  //send test
  res.send("Add new user data ID:(" + user_fb_id +") completely.");
});

//GET Message to user
app.get('/api/message', function(req,res){
  //get data
  var user_fb_id = req.param('userIn');
  var msgIn = req.param('msgIn');
  
  //write data
  database.ref('message/').push({
    userId: user_fb_id,
    message : msgIn ,
    //address : address,
    //age : age
  });
  //send test
  res.send("MESSEGE : get data from ID: " + user_fb_id);
});

//>>>SAVE user feed back
// /feedback
// +userId
// +date
// +msg
app.get('/api/feedback', function(req,res){
  //get data
  var user_fb_id = req.param('userIn');
  var msg = req.param('msgIn');
  //write data
  database.ref('feedback/').push({
    userId: user_fb_id,
    message: msg
  });
  //send test
  res.send("FEEDBACK : get data from ID: " + user_fb_id + " >> " + msg);
});

//WORK UN FIN
//user message - UPDATE
//+ facebook ID
//+ select emotion
//+ cause emotion


//>>>pridect emotion and sent back to chatfuel
//>>>save cause and emotion from user