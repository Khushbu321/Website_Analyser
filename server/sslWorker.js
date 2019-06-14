const { URL } = require('url');
var kue = require('kue');
const sslCertificate = require('get-ssl-certificate');
var express = require('express');
var path = require('path');
var fs = require('fs');
var db = require('../db/index');
var bodyParser = require('body-parser');

var app = express();

var queue = kue.createQueue();

queue.process('job', async function (job, done) {
  try {
    const url = job.data.optionUrl;
    const url_id = job.data.url_id;
    sslCertificate.get(url.substring(12)).then(function (certificate) {
      if (certificate) {
        console.log(url, "-", certificate.valid_to)
        var expiry = certificate.valid_to;
        console.log(url, "-", expiry);
        db.addURLData({
          id: url_id,
          data: { 'expiry': expiry }
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


