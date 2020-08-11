const axios = require("axios");

var options = {
  method: "post",
  url: "https://testws.atdconnect.com/rs/3_6/fitment/year",
  data: {},
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    clientId: "HAMMS_TIRE",
    "Accept-Language": "en-US",
    Authorization: "Basic aGFtbXN0aXJlYXBpOmhhbW1zdGlyZVRlc3QyMA=="
  }
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
    body: JSON.stringify({ cached: cacheHit, data: years })
  });
};
