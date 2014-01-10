/* 	//SAMPLES
	var todos = [
		{
			"userId":1,
			"text":"bob",
			"done":false,
			"_id":"52cc33b31e4f580007000001"
		},
		{
			"userId":1,
			"text":"bob3",
			"done":false,
			"_id":"52cc33bc1e4f580007000003"
		}
	];
 */
module.exports = function(database, _){
	var functions = {
	
		listTodos: function(db) {
			return function(req, res) {
				var collection = db.get('todo');
				collection.find({userId:req.loggedUser.id},{},function(err,todos){
					if (err)
						res.send(err)
					res.json(todos); // return all todos in JSON format
				});
			};
		},
		createTodo: function(db) {
			return function(req, res) {
				var collection = db.get('todo');
				// Submit to the DB
				collection.insert({
					"userId" : req.loggedUser.id,
					"text" : req.body.text,
					"done" : false
				}, function(err, insertedTodo) {
					if (err)
						res.send(err);
					collection.find(insertedTodo,{},function(err,newTodo){
						if (err)
							res.send(err)
						res.json(newTodo);
					});
				});
			};
		},
		deleteTodo: function(db) {
			return function(req, res) {
				var collection = db.get('todo');
				collection.remove({
					_id : req.params.todo_id
				}, function(err, todo) {
					if (err)
						res.send(err);
					res.send(200)
				});
			};
		}
	}
	return functions;
};
