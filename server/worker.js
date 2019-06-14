const puppeteer = require('puppeteer');
const { URL } = require('url');
var kue = require('kue');
var express = require('express');
const fse = require('fs-extra'); // v 5.0.0
var path = require('path');
var db = require('../db/index');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

var queue = kue.createQueue();

queue.process('job', async function (job, done) {
  try {
      const URL = job.data.optionUrl;
      const url_id = job.data.url_id;

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(URL, { waitUntil: 'networkidle2' });
      var HTML = await page.content();
      var manualData = {};

      //HTML semantics
      getSemantics = async() => {
        try{
        var meta_description = await page.evaluate(() =>
         Array.from(document.querySelectorAll('meta[name="description"]')));
        manualData.meta = meta_description.length;


        var title = await page.evaluate(() => Array.from(document.querySelectorAll('title')));
        manualData.title = title.length;


        var head = await page.evaluate(() => Array.from(document.querySelectorAll('head')));
        manualData.head = head.length;


        var html = await page.evaluate(() => Array.from(document.querySelectorAll('html')));
        manualData.html = html.length;


        // var Doctype = await page.evaluate(() => Array.from(document.querySelectorAll('DOCTYPE')));
        // console.log('Number of Doctype: ' + Doctype.length);

        var meta_viewport = await page.evaluate(() => Array.from(document.querySelectorAll('meta[name="viewport"]')));
        manualData.meta_viewport = meta_viewport.length;


        var meta_charset = await page.evaluate(() => Array.from(document.querySelectorAll('meta[charset="utf-8"]')));
        manualData.meta_charset = meta_charset.length;


        var html_lang = await page.evaluate(() => Array.from(document.querySelectorAll('html[lang]')));
        manualData.html_lang = html_lang.length;


        var header = await page.evaluate(() => Array.from(document.querySelectorAll('header')));
        manualData.header = header.length;


        var footer = await page.evaluate(() => Array.from(document.querySelectorAll('footer')));
        manualData.footer = footer.length;


        var main = await page.evaluate(() => Array.from(document.querySelectorAll('main')));
        manualData.main = main.length;

      }
      catch(err){
        console.log(err);
      }
    }

    //Image metrics

    getImageMetrics = async() => {
      try {
      var img = await page.evaluate(() => Array.from(document.querySelectorAll('img')));
      manualData.img = img.length;


      var img_height = await page.evaluate(() => Array.from(document.querySelectorAll('img[height]')));
      manualData.img_height = img_height.length;


      var img_width = await page.evaluate(() => Array.from(document.querySelectorAll('img[width]')));
      manualData.img_width = img_width.length;


      var img_alt = await page.evaluate(() => Array.from(document.querySelectorAll('img[alt]')));
      manualData.img_alt = img_alt.length;

      }
      catch (err) {
        console.log(err);
      }
    }


    //   //Page Metrics
    getPageMetrics = async() => {
      try {
      const metrics = await page.metrics();

      manualData.Documents = metrics.Documents;
      manualData.Frames = metrics.Frames;
      manualData.LayoutDuration = metrics.LayoutDuration;
      manualData.ScriptDuration = metrics.ScriptDuration;
      manualData.RecalcStyleDuration = metrics.RecalcStyleDuration;
      }
        catch (err) {
        console.log(err);
      }
    }
    //   //Performance Metrics
    getPerformanceMetrics = async() => {
      try {

      var prefetch = await page.evaluate(() => Array.from(document.querySelectorAll('link[rel="dns-prefetch"]')));
      manualData.prefetch = prefetch.length;


      var preload = await page.evaluate(() =>
      Array.from(document.querySelectorAll('link[rel="preload"]')));
      manualData.preload = preload.length;


      // var spaces = await page.evaluate(() => Array.from(document.querySelectorAll('\n')));
      // console.log('Number of spaces: ' + spaces.length);
      }
      catch (err) {
        console.log(err);
      }
    }

    getSEOMetrics = async () => {
      try {

        var meta_initial_scale = await page.evaluate(() => Array.from(document.querySelectorAll('meta[initial-scale="1"]')));
        manualData.initial_scale = meta_initial_scale.length;

        var H1 = await page.evaluate(() =>Array.from(document.querySelectorAll('h1')));
        manualData.H1 = H1.length;

        var canonical = await page.evaluate(() =>
          Array.from(document.querySelectorAll('link[rel="canonical"]')));
        manualData.canonical = canonical.length;

       // var spaces = await page.evaluate(() => Array.from(document.querySelectorAll('\n')));
        // console.log('Number of spaces: ' + spaces.length);
      }
      catch (err) {
        console.log(err);
      }
    }


      await getSemantics();
      await getImageMetrics();
      await getPageMetrics();
      await getPerformanceMetrics();
      await getSEOMetrics();
      console.log(manualData);

      db.addURLData({
        id: url_id,
        data: { 'data': manualData }
      })
      // const fs = require('fs');
      // var ws = fs.createWriteStream(
      //   'Output.js'
      // );
      // ws.write(HTML);
      // ws.end();
      // var ws2 = fs.createWriteStream(
      //   'finishedFlag'
      // );
      // ws2.end();
      await browser.close();
      console.log('Job', job.id, 'is done');
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


