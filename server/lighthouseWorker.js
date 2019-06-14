const lighthouse = require('lighthouse');
const puppeteer = require('puppeteer');
var kue = require('kue');
var express = require('express')
const { URL } = require('url');
var db = require('../db/index');
var fs = require('fs');

var app = express();

var queue = kue.createQueue();

queue.process('job', async function (job, done) {
  try {
    const url = job.data.optionUrl;
    const url_id = job.data.url_id;
    console.log(url_id);

    const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  })


// Run Lighthouse.
const {lhr} = await lighthouse(url, {
  port: (new URL(browser.wsEndpoint())).port,
  output: 'json',
  logLevel: 'info',
});

  var output = [];
  var json = [];

  output = Object.keys(lhr.audits);
  output.map((items) => {
    json.push({[items]:
      {   'id': lhr.audits[items].id,
          'score': lhr.audits[items].score,
          'title': lhr.audits[items].title,
          'description': lhr.audits[items].description
      }
    });
  })
  // console.log(json);
  // console.log(output);
  // console.log(`Lighthouse scores: ${Object.values(lhr.categories).map(c => c.score).join(", ")}`);

await browser.close();
console.log('Job', job.id, 'is done');;
done && done();
db.addURLData({
  id: url_id,
  data: {'data': json}
})
  }
  catch (err) {
    console.log(err);
    console.log({
      status: 400,
      error: "Could not connect"
    })
  }
})


