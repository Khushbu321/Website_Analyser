const { URL } = require('url');
var kue = require('kue');
var ping = require('jjg-ping');
var express = require('express');
var path = require('path');
var db = require('../db/index');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

var queue = kue.createQueue();

queue.process('job', async function (job, done) {
  try {
    var url = job.data.optionUrl;
    const url_id = job.data.url_id;
    url = url.substring(12);
    ping.system.ping(url, function (latency, status) {
      if (status) {
        console.log('Host is reachable (' + latency + ' ms ping).');
        db.addURLData({
          id: url_id,
          data: { 'latency': latency }
        })
      }
      else {
        console.log('Cannot ping host');
      }
    });
    done && done();
  }
  catch (err) {
    console.log(err);
    console.log({
      status: 400,
      error: "Could not connect"
    })
  }
})


