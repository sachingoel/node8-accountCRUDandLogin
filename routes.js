'use strict';
const user = require('./app/routes/user');

 function registerEndpoints(app){
    app.use('/user',user);
}


module.exports = registerEndpoints;
