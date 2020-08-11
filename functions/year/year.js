const axios = require("axios");
const path = require("path");
const fs = require("fs");

const WEEK_IN_SECONDS = 3600 * 24 * 7;

const headers = fs.readFileSync(
  path.resolve(__dirname) + "/headers.json",
  "utf-8"
);

var options = {
  method: "post",
  url: "https://testws.atdconnect.com/rs/3_6/fitment/year",
  data: {},
  ...JSON.parse(headers)
};

exports.handler = async (event, context, callback) => {
  let cacheHit = true;

  console.log(process.env.YEARS);

  if (!process.env.YEARS) {
    var req = await axios(options).then(res => (process.env.YEARS = res.data));
    cacheHit = false;
  }

  console.log(typeof process.env.YEARS);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      timestamp: Math.floor(Date.now() / 1000),
      cached: cacheHit,
      data: process.env.YEARS
    })
  });
};
