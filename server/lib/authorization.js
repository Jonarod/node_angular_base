module.exports = function(roles, app, database, _) {
	roles.use('delete todo', function (req) {
		if (req.loggedUser.role === 'admin') {
			return true;
		}
	})
};
