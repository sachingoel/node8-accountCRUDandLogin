'use strict';
const user = require('./app/routes/user');
const file = require('./app/routes/file');
const stocks = require('./app/routes/stocks')

 function registerEndpoints(app){
    app.use('/user',user);
    app.use('/file',file);
    app.use('/stocks',stocks);
}


module.exports = registerEndpoints;
