const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 5000;

const weather = 'https://api.darksky.net/forecast/734380008b4832fb5da71a68d80737d4/';
const test = 'https://api.darksky.net/forecast/734380008b4832fb5da71a68d80737d4/36.8506,-75.9779';

const location = 'https://maps.googleapis.com/maps/api/geocode/json?';
const api = 'AIzaSyC1dEid2g2vnR4-hHJvN_ZbNN1o9vOUwFI';



// app.use(express.static(path.join(__dirname, 'client/build')));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/test', function(req,res) {
    res.status(200).send('good things');
  });
  app.get('/weather', function(req,res,next){
    console.log('getting weather', req.query);
    const loc = req.query.location;
    const url = `${weather}${loc}`;
    // axios.get('http://www.mocky.io/v2/5d30962b320000a97720460b') // Getting the data from DarkSky
    //   .then( result => res.status(200).send({succes: result}))
    //   .catch( error => res.status(400).send(error))
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
  // axios.get('http://www.mocky.io/v2/5d30962b320000a97720460b') // Getting the data from DarkSky
  //   .then( result => res.status(200).send({succes: result}))
  //   .catch( error => res.status(400).send(error))
  axios.get(url)
  .then(function (response) {
    res.status(200).send(response.data);
  })
  // res.status(200).send({succes: 1234});
});

app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})

app.listen(port, (req, res) => {  console.log( `dudes listening on port: ${port}`);})