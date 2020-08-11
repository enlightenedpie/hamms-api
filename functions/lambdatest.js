const http = require('http')

var options = {
  method: 'POST',
  protocol: 'https',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "clientId": "HAMMS_TIRE",
    "Accept-Language": "en-US",
    "Authorization": "Basic aGFtbXN0aXJlYXBpOmhhbW1zdGlyZVRlc3QyMA=="
  }
}

var years

exports.handler = async (event, context, callback) => {
  years = years || await http.request("https://testws.atdconnect.com/rs/3_6/fitment/year",
  options,
  (response) => response)

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ years }),
  })
}
