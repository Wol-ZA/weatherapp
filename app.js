const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => {res.sendFile(__dirname + "/index.html")});

app.post("/", (req,res) => {
  const query = req.body.cityName;
  const apiKey = '059bae824b630b9e470d2201c306f376';
  const units = 'metric';
  const callWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
  https.get(callWeather, response => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
      res.write("<h1>The temp in " + query +" is " + temp + " degrees</h1><br>");
      res.write("<h2>The weather is currently " + description + "</h2>");
      res.write("<img src =" + icon +">")
      res.send();
    });
  });
});




app.listen(3000, () => console.log("Server is running"));
