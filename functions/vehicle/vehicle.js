"use strict";

const axios = require("axios");
const path = require("path");
const fs = require("fs");
const { generateKeyPair } = require("crypto");

const WEEK_IN_SECONDS = 3600 * 24 * 7;

const ENUM = {
  routes: [
    { path: "year", shape: [] },
    { path: "make", shape: ["year"] },
    { path: "model", shape: ["year", "make"] },
    { path: "trim", shape: ["year", "make", "model"] },
    { path: "trim-option", shape: ["year", "make", "model", "trim"] }
  ]
};

const headers = fs.readFileSync(
  path.resolve(__dirname) + "/headers.json",
  "utf-8"
);

exports.handler = async (event, context, callback) => {
  let qvar = event.path.replace(/^\/?/g, "").split("/")[1],
    url = "https://testws.atdconnect.com/rs/3_6/fitment/",
    body = JSON.parse(event.body) || {},
    status = 200,
    result;

  let ಠ_ಠ = ENUM.routes.some((obj, iii, arr) => {
    let a = obj.shape.sort(),
      b = Object.keys(body).sort();

    for (var i = 0; i < a.length; ++i) {
      if (b.length === 0) break;

      if (a[i] !== b[i]) {
        return false;
      }
    }

    url = url + obj.path;
    return true;
  });

  if (!ಠ_ಠ) {
    result = { error: "Your request is malformed. Please try again" };
    status = 400;
  }

  if (status !== 400) {
    var options = {
      method: "post",
      url: url,
      data: body,
      headers: JSON.parse(headers)
    };
    result = await axios(options).then(res => res.data);
  }

  callback(null, {
    statusCode: status,
    body: JSON.stringify({
      timestamp: Math.floor(Date.now() / 1000),
      data: result
    })
  });
};
