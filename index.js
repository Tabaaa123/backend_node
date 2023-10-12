var express = require('express'),
    routes = require('./routes'), 
    path = require('path'),
    fileUpload = require('express-fileupload'),
    app = express(),
    mysql = require('mysql'),
    bodyParser = require('body-parser');

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'profile_reg'
    });

connection.connect();
global.db = connection;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// dev only
app.get('/', routes.index);    // call for the main index page
app.post('/', routes.index);
app.get('/profile/:id', routes.profile); // corrected route parameter syntax

// middleware
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
