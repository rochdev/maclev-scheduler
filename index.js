'use strict';

var kue = require('kue');
var schedule = require('node-schedule');

var queue = kue.createQueue({
  redis: {
    host: 'queue'
  }
});

schedule.scheduleJob('00 05 * * *', createJob);

function createJob() {
  queue.create('refresh cache', {title: 'brew formulas', key: 'brew-formulas'}).save();
  queue.create('refresh cache', {title: 'brew casks', key: 'brew-casks'}).save();
  queue.create('refresh cache', {title: 'node modules', key: 'node-modules'}).save();
  queue.create('refresh cache', {title: 'node versions', key: 'node-versions'}).save();
  queue.create('refresh cache', {title: 'ruby versions', key: 'ruby-versions'}).save();
}
