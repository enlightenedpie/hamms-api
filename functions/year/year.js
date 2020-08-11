"use strict";

const axios = require("axios"),
  path = require("path"),
  fs = require("fs");

const WEEK_IN_SECONDS = 3600 * 24 * 7;

const headers = JSON.parse(
  readFileSync(resolve(__dirname) + "/headers.json", "utf-8")
);

var options = {
  method: "post",
  url: "https://testws.atdconnect.com/rs/3_6/fitment/year",
  data: {},
  ...headers
};

var years;

exports.handler = async (event, context, callback) => {
  let cacheHit = true;

  if (!years) {
    var req = await axios(options).then(res => (years = res.data));
    cacheHit = false;
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      timestamp: Math.floor(Date.now() / 1000),
      cached: cacheHit,
      data: years
    })
  });
};
