var compressor = require('node-minify');

exports.Css = function compressCss() {		//COMPRESS CSS
	new compressor.minify({
		type: 'yui-css',
		fileIn: [
		'client/App/stylesheets/normalize.css', 
		'client/App/stylesheets/bootstrap.min.css', 
		'client/App/stylesheets/bootstrap-theme.min.css', 
		'client/App/stylesheets/font-awesome.min.css', 
		//'client/App/stylesheets/foundation.min.css', 
		//'client/App/stylesheets/ie7-grid-foundation-4.css', 
		//'client/App/stylesheets/ie8-grid-foundation-4.css', 
		'client/App/stylesheets/global.css'
		],
		fileOut: 'client/App/stylesheets/all-min.css',
		callback: function(err, min){
			console.log('...compressed css');
			if (err) console.log(err);
		}
	});
}


exports.Js = function compressJs() {			//COMPRESS JS
	new compressor.minify({
		type: 'yui-js',
		fileIn: [
		'client/App/javascript/vendor/respond.min.js', 
		'client/App/javascript/vendor/custom.modernizr.js', 
		'client/App/javascript/vendor/bootstrap.min.js', 
		'client/App/javascript/vendor/fittext.js', 
		'client/App/javascript/vendor/underscore.min.js', 
		//'client/App/javascript/vendor/foundation.min.js', 
		'client/App/javascript/docs.js'
		],
		fileOut: 'client/App/javascript/all-min.js',
		callback: function(err, min){
			console.log('...compressed js');
			if(err) console.log(err);
		}
	});
}
