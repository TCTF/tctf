 var Discord = require('discord.io');
 var logger = require('winston');
 var auth = require('./auth.json');

 //setup logging.

 var logger = new(winston.Logger)({
   transports: [
     new(winston.transports.File)({
       name: 'info-file',
       filename: 'failsafe-info.log',
       level: 'info'
     }),
     new(winston.transports.File)({
       name: 'debug-file',
       filename: 'failsafe-debug.log',
       level: 'debug'
     }),
     new(winston.transports.File)({
       name: 'error-file',
       filename: 'failsafe-error.log',
       level: 'error'
     }),
     new(winston.transports.Console)({
       colorize: true,
       level: 'debug'
     })
   ],
   exceptionHandlers: [
     new(winston.transports.File)({
       name: 'exceptions-file',
       filename: 'failsafe-exceptions.log',
       handleExceptions: true,
       humanReadableUnhandledException: true
     })
   ],
   level = 'info'
 });


 // Initialize Discord Bot
 var bot = new Discord.Client({
   token: auth.token,
   autorun: true
 });
 bot.on('ready', function(evt) {
   logger.info('Connected');
   logger.info('Logged in as: ');
   logger.debug(bot.username + ' - (' + bot.id + ')');
   logger.debug('Using token ID' + auth.token);
 });
 bot.on('message', function(user, userID, channelID, message, evt) {
       // Our bot needs to know if it will execute a command
       // It will listen for messages that start with '!'
       if (message.substring(0, 1) == '!') {
         logger.debug('Command detected');
         var args = message.substring(1).split(' ');
         var cmd = args[0];
         logger.debug('Command used: '+ cmd); 

         args = args.splice(1);
         switch (cmd) {
           // !ping
           case 'ping':
             bot.sendMessage({
               to: channelID,
               message: 'Pong!'
             });
             break;
             // Just add any case commands if you want to..
         }
       }
     }
