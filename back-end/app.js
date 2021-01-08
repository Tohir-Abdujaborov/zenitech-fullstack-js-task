const express = require("express");
const request = require("request");
var cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

const API_KEY = "5951f08263584c244fef814c8fe6d94a";

app.get("/getRecent", (req, res) => {
  request(
    `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&format=json&nojsoncallback=1`,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var parseBody = JSON.parse(body);
        res.send(parseBody);
      }
    }
  );
});

app.get("/getSearch", (req, res) => {
  const searchTags = req.query.searchTags;
  request(
    `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${searchTags}&format=json&nojsoncallback=1`,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var parseBody = JSON.parse(body);
        res.send(parseBody);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
