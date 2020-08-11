const axios = require('axios')

var options = {
  method: 'post',
  url: "https://testws.atdconnect.com/rs/3_6/fitment/year",
  data: {},
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "clientId": "HAMMS_TIRE",
    "Accept-Language": "en-US",
    "Authorization": "Basic aGFtbXN0aXJlYXBpOmhhbW1zdGlyZVRlc3QyMA=="
  }
};

var years;

exports.handler = async (event, context, callback) => {
  var postData = JSON.stringify({})

  if (!years) {
    var req = await axios(options)
      .then((res) => console.log(res.data))
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ years }),
  })
}
