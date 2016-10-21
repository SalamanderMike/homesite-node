var config = 
	// require('./assets/resources/config.js').env,											// DISABLED FOR PRODUCTION
	express = require('express'),
	bodyParser  = require('body-parser'),
	path = require('path'),
	app = express();



// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



// Setup
app.use('/partials', express.static(path.join(__dirname + '/views/partials')));				// PLACE PARTIALS IN /views
app.use('/locales', express.static(path.join(__dirname + '/locales')));						// PLACE PARTIALS IN /views
app.use('/bower_components', express.static(path.join(__dirname + '/bower_components')));	// PLACE BOWER REQUIREMENTS
app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');


// APIs
var env = process.env.GOOGLE_KEY || 'develop';

app.get('/config', function (req, res) {
	if (env !== 'develop') {
		res.send(env);
	} else {
		console.log("PING");
		res.json({result: process.env.LOCAL_ENV});
	}
});


// ROUTES
require('./routes/routes')(app);



// NODEMON **************************************
app.listen(process.env.PORT || 3000, function(){
	console.log("NODEMON IS LISTENING IN THE NODE VAN... localhost:3000");
});


// EXPORT ***************************************
module.exports = app;
