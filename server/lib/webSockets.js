module.exports = function(app, database, io, _) {
	var nbOfUsers = 0;
	
	io.sockets.on('connection', function (socket) {
		nbOfUsers ++;
		var ips=[];
		console.log(nbOfUsers==1 ? nbOfUsers + ' user connected.': nbOfUsers + ' users connected.');
		var ipaddress = socket.handshake.address;
		ips = _.union(ips, ipaddress.address);
		console.log('These users are connected :');
		_.each(ips, function(ip) {
			console.log(ip);
		});
		socket.on('disconnect', function () {
			nbOfUsers --;
			console.log(nbOfUsers==1 ? nbOfUsers + ' user connected.': nbOfUsers + ' users connected.');	
		});

	});
};
