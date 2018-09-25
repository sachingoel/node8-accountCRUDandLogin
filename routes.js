'use strict';
const user = require('./app/routes/user');
const file = require('./app/routes/file');

 function registerEndpoints(app){
    app.use('/user',user);
    app.use('/file',file);
}


module.exports = registerEndpoints;
