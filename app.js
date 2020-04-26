
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/cea7387de4";
  const options = {
    method: "POST",
    auth: "ntn:541da67eb76c85b62bd4de23fdaa6bfd-us8"
  }
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });

  });
  request.write(jsonData);
  request.end();

})


app.listen(3000, function () {

  console.log("Server is running on port - 3000");
});





