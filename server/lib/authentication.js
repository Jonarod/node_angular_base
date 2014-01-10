module.exports = function(passport, database, LocalStrategy, userModel) {
	
	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session
	
	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	
	// used to deserialize the user	
	passport.deserializeUser(function(id, done) {
		userModel.findById(id, function (err, user) {
			done(err, user);
		});
	});


	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'
	passport.use('local-login', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, username, password, done) {
		//asynchronous verification, for effect...
		process.nextTick(function () {
		  
			//Find the user by username.  If there is no user with the given
			//username, or the password is not correct, set the user to `false` to
			//indicate failure and set a flash message.  Otherwise, return the
			//authenticated `user`.
			userModel.findByUsername(username, function(err, user) {
				if (err) { return done(err); }
				if (!user) { return done(null, false); }
				if (user.password != password) { return done(null, false); }
				return done(null, user);
			})
		});
	}));


};
