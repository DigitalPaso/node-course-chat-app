require ('./config/config.js');
var express = require('express');
//var {authenticate} = require ('./middleware/authenticate.js');

// node module called path
const path = require('path');
const publicPath = path.join('__dirname', '../public');
const port = process.env.PORT;

var app = express();
app.use (express.static(publicPath));

app.get ('/', (req, res) => {
});

app.listen(port, () => {
    console.log (`Server started on port ${port}`);
});

module.exports = {app};
