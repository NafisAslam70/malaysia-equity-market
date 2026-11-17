const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const symbolMap = require('./symbolMap');
const getHistoricalData = require('./getHistoricalData');
const getProfileDetails = require('./getProfileDetails');
const fetchNewsData = require('./fetchNewsData');

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/landing.html");
});

app.post("/veryFirst", function(req, res) {
  const query = req.body.companyName.toLowerCase();
  res.redirect(`/company.html?query=${encodeURIComponent(query)}`);
});

app.get("/company-list", function(req, res) {
  res.render("company-list", { companies: symbolMap });
});


app.get("/company.html", function(req, res) {
  const query = req.query.query;
  const symbol = symbolMap[query];

  if (symbol) {
    Promise.all([getHistoricalData(symbol), getProfileDetails(symbol,query), fetchNewsData(symbol)])
      .then(([historicalData, profileDetails, newsData]) => {
        const historicalData2 = historicalData.split('\n').slice(1).map(row => row.split(','));
        const lastRow = historicalData2[historicalData2.length - 1];

        
        console.log(profileDetails);

        res.render("company", { companyDetail: profileDetails, chartData: historicalData, lastRow:lastRow, newsData: newsData });
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send("Error occurred while fetching data.");
      });
  } else {
    // res.status(400).send("Invalid company name.");
      res.status(400).render('error', {
      message: "Invalid company name. Please ensure you've typed the correct company name."
  });
  }
});

app.listen(3005, function() {
  console.log("Server started and listening on port 3005");
});

