const path = require("path")
const fs = require("fs")

var years = fs.readFile(
  path.resolve(__dirname) + "/store/years.json",
  "utf8",
  (err, data) => {
    console.log(path.resolve(__filename))
  }
)

exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ years }),
  })
}
