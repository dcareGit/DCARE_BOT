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

ref.on("child_added", function(snapshot, prevChildKey) {
  var newPost = snapshot.val();
  console.log("UserId: " + newPost.userId);
  console.log("Message: " + newPost.message);
  //console.log("Previous Post ID: " + prevChildKey);
});
////////////////////////////////////////////

//GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});

//>>>get first message from chatfuel to firebase

app.get('/api/user', function(req,res){
  //get data
  var user_fb_id = req.param('userIn');
  var name = req.param('nameIn');
  var gender = req.param('genderIn');
  //var address = req.param('addressIn');
  //var age = req.param('user')
  //write data
  database.ref('user/'+user_fb_id).set({
    userId: user_fb_id,
    name : name ,
    gender: gender
    //address : address,
    //age : age
  });
  //send test
  res.send("Add new user data" + user_fb_id );
});

//user message - PUSH
//fb_id user1stInput date
// + send to model to predict + save
// + send predict_emo to chatfuel
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
  res.send("Add new message");
});

//user message - UPDATE
//fb_id real_emo causeInput
//>>>pridect emotion and sent back to chatfuel

//>>>save cause and emotion from user

//>>>save user feed back
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
  res.send(user_fb_id + " >> " + msg);
});

//>>>calculate point of user and notification when is have signal

//>>> show result by get 




// ///ref.on("child_added", function(snapshot, prevChildKey) {
//   var newPost = snapshot.val();
//   console.log("UserId: " + newPost.userId);
//   console.log("Message: " + newPost.message);
//   //console.log("Previous Post ID: " + prevChildKey);
// });


// app.get('/aa', function (req, res) {
//   var testV = req.param('att');

//   res.json({
//     "messages": [
//     {
//       "text" : "hello " + testV
//     }]
//   });
//   res.send('GET request to the homepage aaaaQQQaa');
// });
// app.get('/newMsg', function(req, res) {

//   res.send("Hello");
//   //res.send(item + "Hello aaa")
// });
// //
// // name gender 
// // dateBegin dateLatest status
// // Address age 