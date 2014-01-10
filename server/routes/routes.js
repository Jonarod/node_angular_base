module.exports = function(app, database, passport, todoModel, roles) {
	
	//===========================================================================
	//APP =======================================================================
	//===========================================================================
	app.get('/', function(req, res){
		res.render('App/views/index.jade', {title: 'Home', keywords:'keyword1, keyword2, keyword3', description: 'Sentence with keyword1, keyword2 and keyword3.'});
	});
	app.get('/partials/:name', function(req, res){
		var name = req.params.name;
		res.render('App/views/partials/'+ name);
	});
	
	//curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
	app.post('/login', passport.authenticate('local-login'),function(req, res) {
		res.send({"isLogged" : req.isAuthenticated(), "username" : req.isAuthenticated()?req.loggedUser.username:null});
	});
	app.get('/logout', function(req, res) {
		req.logout();
		res.send(200);
	});
	// route to test if the user is logged in or not
	app.get('/loginstatus', function(req, res) {
		res.send({"isLogged" : req.isAuthenticated(), "username" : req.isAuthenticated()?req.loggedUser.username:null});
	});

	//===========================================================================
	//API =======================================================================
	//===========================================================================
	var db = database.connect();

	app.all('/api/*', ensureLoggedIn);
	
	app.get('/api/todos', todoModel.listTodos(db));
	app.post('/api/todos', todoModel.createTodo(db));
	app.delete('/api/todos/:todo_id', roles.can('delete todo'), todoModel.deleteTodo(db));

	//===========================================================================
	//ERRORS =======================================================================
	//===========================================================================
	app.get('*', function(req, res){
		res.render('App/views/index.jade', { user: req.user, title: 'Home', keywords:'keyword1, keyword2, keyword3', description: 'Sentence with keyword1, keyword2 and keyword3.'});
	});
	app.get('/*', function(req, res){			//404 Route (ALWAYS Keep this as the last route)
		res.send(404, 'Oops! <br> This page doesn\'t exists... <br> No problem ! Go back to ');
	});


};


function ensureLoggedIn(req, res, next) {
	// is authenticated
	if (req.isAuthenticated())
		return next();
	// is not authenticated : send unauthorized status
	res.send(401);
}

/*
function ensureAuthorized(req, res, next) {
    var role;
    if(!req.loggedUser) role = userRoles.public;
    else                role = req.loggedUser.role;

    //var accessLevel = _.findWhere(routes, { path: req.route.path }).accessLevel || accessLevels.public;

    //if(!(accessLevel.bitMask & role.bitMask)) return res.send(403);
    //return next();
}
*/
