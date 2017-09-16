var assert = require('assert'),
    vows = require('vows'),
    failsafe = require('../');


 vows.describe('play-ping-poing').addBatch({
 	'When playing ping pong': {
 		topic: failsafe.bot.on('!Ping'),
 		'result should be valid': function(result) {
 			assert.equal(result, 'Pong!');
 		}
 	}
 }).export(module);
