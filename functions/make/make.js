const axios = require("axios");
const path = require("path");
const fs = require("fs");

const WEEK_IN_SECONDS = 3600 * 24 * 7;

const headers = fs.readFileSync(
  path.resolve(__dirname) + "/headers.json",
  "utf-8"
);

exports.handler = async (event, context, callback) => {
  var options = {
    method: "post",
    url: "https://testws.atdconnect.com/rs/3_6/fitment/make",
    data: JSON.parse(event.body) || {},
    ...JSON.parse(headers)
  };

  var makes = await axios(options).then(res => res.data);

  /* let cacheHit = true;

  if (!makes) {
    cacheHit = false;
  } */

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      timestamp: Math.floor(Date.now() / 1000),
      cached: cacheHit,
      data: makes
    })
  });
};
