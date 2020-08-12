"use strict";

const axios = require("axios");
const path = require("path");
const fs = require("fs");

const WEEK_IN_SECONDS = 3600 * 24 * 7;

const ENUM = {
  routes: ["year", "make", "model", "trim", "trim-option"]
};

const headers = fs.readFileSync(
  path.resolve(__dirname) + "/headers.json",
  "utf-8"
);

exports.handler = async (event, context, callback) => {
  let { qvar } = event.queryStringParameters;

  console.log(qvar, ENUM.routes.indexOf(qvar));

  if (ENUM.routes.indexOf(qvar) < 0)
    return new Error("This route is undefined or not allowed.");

  var options = {
    method: "post",
    url: "https://testws.atdconnect.com/rs/3_6/fitment/" + qvar,
    data: JSON.parse(event.body) || {},
    headers: JSON.parse(headers)
  };

  var result = await axios(options).then(res => res.data);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      timestamp: Math.floor(Date.now() / 1000),
      data: result
    })
  });
};
