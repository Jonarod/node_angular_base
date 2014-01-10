var mongo = require('mongodb')
  , monk = require('monk')
  ;
module.exports.connect = function(){
	return monk('localhost:27017/todo');
}
