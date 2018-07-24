'use strict';

let winston = require('winston');

winston.configure({
  transports: [
    new(winston.transports.Console)({
      name: 'console-logs',
      timestamp: true,
      colorize: true
    }),
    new(winston.transports.File)({
      name  : 'file-info-logs',
      filename:'./info.log',
      timestamp: true,
      colorize : true,
      level:'info'
    }),
    new(winston.transports.File)({
      name  : 'file-error-logs',
      filename:'./error.log',
      timestamp:true,
      colorize:true,
      level:'error',
      prettyPrint:true
    })
  ]
});

module.exports = winston;