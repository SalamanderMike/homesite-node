module.exports = function (app) {

	app.get('/test', function (req,res) {		// ALLOWS ANGULAR ROUTER TO USE /test AS AN ADDRESS
		res.render('site');
	});

	app.get('*', function (req,res) {			// CAPTURES ALL ADDRESSES AND RENDERS THEM AS site.ejs
		res.render('site');
	});

}




// The following will download the file onto your computer instead of rendering it
//
// var path = require('path');
// var root_path = {
//     root: path.join(__dirname, '../views/')			// CHANGES THE ROOT PATH TO A STEP OUTSIDE OF /routes, THEN INTO /views
// };
// router.get('/download', function (req, res) {		// WHEN NAVIGATING TO /download FILE WILL DOWNLOAD
//     res.sendFile('site.ejs', root_path);
// });
