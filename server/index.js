var kue = require('kue');
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var db = require('../db/index');
var app = express();

var queue = kue.createQueue();

app.use(bodyParser.json());

app.post('/api/sendURL', async (req, res) => {
  var optionUrl = req.body.optionURL;
  var url_id;
  try {
    url_id = await db.addURL(optionUrl);
    console.log(url_id);
      var job = queue.create('job', {
        optionUrl,
        url_id
      }).priority('high')
        .attempts(5)
        .save(function (err) {
            if (!err)
              console.log(job.id);
          });
      res.json({ });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      error: "Could not add URL"
    })
}
});

app.get('/api/getResults', async (req, res) => {
  var optionUrl = req.query.url;
  var data;
  try {
    data = await db.getURLData(optionUrl);
    console.log('*******',data)
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      error: "Could not get results"
    })
  }
})

app.listen(3001);
console.log("Running Server");

