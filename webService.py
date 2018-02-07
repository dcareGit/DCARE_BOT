#!/usr/bin/env python
# -- coding: utf-8 --

from flask import Flask,request
from firebase import firebase
#import setting
import os
import datetime
import time; 
#import pyrebase



# from firebase_token_generator import create_token
# auth_payload = { "uid": "1", "auth_data": "foo", "other_auth_data": "bar" }
# options = {"admin": True}
# token = create_token("serviceAccount.json", auth_payload, options)

now = time.time()
#now = datetime.datetime.now()
# str(now)

app = Flask(__name__)
#connect database
firebase = firebase.FirebaseApplication('https://dcarebotx-192914.firebaseio.com', None)
# f = firebase('https://dcarebotx-192914.firebaseio.com', auth_token=token)


@app.route('/')
def index():
	return "Hello World!"

#add user information
@app.route('/add_user')
def add_user():
	user_id = request.args.get('user_id')
	user_name = request.args.get('name')
	age = request.args.get('age')
	gender = request.args.get('gender')
	date_login = str(time.time()) 
	date_lastest = str(time.time())
	status = 1
	#1 - normal , o - null

	result = firebase.post('/users/'+user_id, data={"username":user_name,"age":age,"gender":gender,"date_login":date_login,"date_lastest":date_lastest,"status":status})

	return "GET : user information"

#add user score
@app.route('/add_score')
def add_score():
	#get fb id score 9q 8q date
	user_id = request.args.get('user_id')
	score9q = request.args.get('score9')
	score8q = requesta.args.get('score8')
	date = str(time.time())
	#add to firebase
	return "GET : Add score already"

#add message
@app.route('/add_message_1')
def add_message1():
	user_id = request.args.get('user_id')
	messageInput = request.args.get('msg')
	date = str(time.time())
	#add to firebase
	result = firebase.post('/message/'+user_id, data={"message":messageInput,"date":date})
	#send to predict

	#send to user

	#add message about
	#real emotion predict emotion cause 
	#reurn message ID
	return "GET : Add message 1 already"

#add message detail
@app.route('/add_message_2')
def add_message2():
	messageId = request.args.get('msg_id')
	user_id = request.args.get('user_id')
	messageCause = request.args.get('msg')

	return "GET : Add message 2 already"

@app.route('/add_feedback')
def add_feedback():
	#get data from get url

	# add user id / date / comment 
	user_id = request.args.get('user_id')
	msg = request.args.get('msg')
	date = str(time.time())
	#save to data to variable

	#referrence https://github.com/ozgur/python-firebase/issues/51
	#result = firebase.post('/feedback/'+user_id, data={"id":user_id,"message":msg,"date":date}, params={'print': 'pretty'})
	result = firebase.post('/feedback/'+user_id, data={"id":user_id,"message":msg,"date":date})
	
	#print result
	print (result);
	return "GET : Add feedback already"

############################# QUERY DATA #############################
@app.route('/show_userInfo')
def show_userInfo():
	#get data from get url
	# = request.args.get('user_id')

	result = firebase.get('/users', None, {"gender":'601'})
	print (result)

	#msg = "show"+result
	#print(result)

	return "result"

# firebase = firebase.FirebaseApplication("https://dcarebotx-192914.firebaseio.com/user", None)
# Ref = firebase.database().ref("users/");
# #@app.route('/feedback', methods=["GET"])
# @app.route('/feedback', methods=['GET'])
# def get_feedback():
# 	#get data from get url
# 	user_id = request.args.get('user_id')
# 	msg = request.args.get('msg')
# 	date = str(now)
# 	#save to data to variable
# 	#user = firebase('https://dcarebotx-192914.firebaseio.com/feedback/' + user_id)
# 	#user = Firebase('https://dcarebotx-192914.firebaseio.com/user/')
# 	# users_ref = firebase.child('user')
# 	Ref.set({
# 		'message': 'msg',
# 		'date': 'date'
# 		});
# 	#data = 'Get feedback from ID:'+ user_id +' - ' + msg + '/' + date +'+++++'+ hero
# 	return 'test'
# #get data
# #	firebase1 = firebase.FirebaseApplication("https://dcarebotx-192914.firebaseio.com/")
# #	result = firebase1.get('/user/',None)
# #	print(result)

if __name__ == "__main__":
    app.run()