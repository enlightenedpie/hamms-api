const https = require('https')

var options = {
  method: 'POST',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "clientId": "HAMMS_TIRE",
    "Accept-Language": "en-US",
    "Authorization": "Basic aGFtbXN0aXJlYXBpOmhhbW1zdGlyZVRlc3QyMA=="
  }
};

var years;

exports.handler = (event, context, callback) => {
  var postData = JSON.stringify({})

  if (!years) {
    var req = https.request("https://testws.atdconnect.com/rs/3_6/fitment/year",
    options,
    (res) => {
      var body = "";
      res.on('data', (data) => {
        body += data;
      });
      res.on('end', () => {
        console.log(body);
        years = body;
      })
    })

    req.on('error', (e) => {
      years = e;
    });
    req.write(postData);
    req.end();
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ years }),
  })
}
