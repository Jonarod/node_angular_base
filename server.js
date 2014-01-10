// DEPENDENCIES ===================================================================
var express = require('express')
  , http = require('http')
  , path = require('path')
  , email = require('emailjs/email')
  , flash = require('connect-flash')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , socketio = require('socket.io')
  , _ = require('underscore')
  , roles = require('connect-roles')
  , database = require('./server/config/database.js')
  , smtpServer = require('./server/config/smtpServer.js')

  , userModel = require('./server/models/users.js')(database, _)
  , todoModel = require('./server/models/todos.js')(database, _)
  ;


// AUTHENTICATION ===================================================================  
require('./server/lib/authentication.js')(passport, database, LocalStrategy, userModel)

// AUTHORIZATION ====================================================================
require('./server/lib/authorization.js')(roles, app, database, _)

// MINIFY ASSETS ===================================================================  
var minify = require('./server/lib/minify.js');
minify.Css(); 
minify.Js()

// SMTP SERVER ===================================================================  
var smtp_server  = email.server.connect({
		user:     smtpServer.user, 
		password: smtpServer.password,
		host:     smtpServer.host,
		ssl:      smtpServer.ssl
});

// CONFIG ===================================================================  
var app = express();
	app.configure(function() {
			app.set('port', process.env.PORT || 3000);									//port 
			app.set('views', __dirname + '/client');									//views directory
			app.set('view engine', 'jade');												//set default view engine to Jade	
			app.use(express.favicon());													//use favicon
			app.use(express.logger('dev'));												//log each requests
			app.use(express.bodyParser());												//pull information from html in POST
			app.use(express.methodOverride());											//support DELETE & PUT
			app.use(express.cookieParser());											//parse cookies

			app.use(express.session({ secret: 'keyboard cat' }));						//handle session

			var oneYear = 1000*60*60*24*365;											//calc one year for cache
			app.use(express.compress()); 												//gzip assets
			app.use(express.static(path.join(__dirname, '/client'), { maxAge: 0 }));	//cache: do not forget to change maxAge 0 to oneYear
			app.use(passport.initialize({ userProperty: 'loggedUser' }));						//use passport
			app.use(passport.session());												//create passport session
			app.use(flash());															//use flash messages for passport
			app.use(roles);																//serve routes
			app.use(app.router);														//serve routes

		});

var server = http.createServer(app);

var io = socketio.listen(server);
io.set('log level', 1);

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'))
	console.log('Ctr C to stop server.')
	console.log('Wait for JS and CSS compression before anything...')
});


// ROUTES ===================================================================  

require('./server/routes/routes.js')(app, database, passport, todoModel, roles);
require('./server/lib/WebSockets.js')(app, database, io, _);




