const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const locs = require('./locations.json');
const cors = require('cors')

const port = process.env.PORT || 5000;
const WEATHER_API = process.env.WEATHERAPI;
const LOCAPI = process.env.LOCAPI;
const GOOGLE = process.env.MAPAPI || 'mockapi';
const weather = `https://api.darksky.net/forecast/${WEATHER_API}/`;

const location = 'https://maps.googleapis.com/maps/api/geocode/json?';
const api = LOCAPI;

app.use(cors())

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/test', function(req,res) {
    res.status(200).send('good things');
  });
  app.get('/getapi', function(req,res){
    res.status(200).send(GOOGLE);
  })

  app.get('/weather', function(req,res,next){
    const loc = req.query.location;
    const url = `${weather}${loc}`;
    axios.get(url)
    .then(function (response) {
      res.status(200).send(response.data);
    })
  });

  app.get('/location', function(req,res,next){
    console.log('getting location', req.query);
    const loc = req.query.place;
    if (!locs[loc]) {
      locs[loc] = {
        name: [loc],
      }
    }
    const url = `${location}address=${loc}&key=${api}`;
    axios.get(url)
    .then(function (response) {
      res.status(200).send(response.data);
    })
    // res.status(200).send({succes: 1234});
  });
  app.get('*', (req, res) => { res.sendfile(path.join(__dirname = 'client/build/index.html'));  })
}
app.get('/test', function(req,res) {
  res.status(200).send('good things');
});

app.get('/weather', function(req,res,next){
  console.log('getting weather', req.query);
  const loc = req.query.location;
  const url = `${weather}${loc}`;
  axios.get(url)
  .then(function (response) {
    res.status(200).send(response.data);
  })
  // res.status(200).send({succes: 1234});
});

app.get('/getapi', function(req,res){
  res.status(200).send(GOOGLE);
})

app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})

app.listen(port, (req, res) => {  console.log( `dudes listening on port: ${port}`);})