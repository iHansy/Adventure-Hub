const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

//retrieving all adventure
router.get('/', (req, res) => {
  axios.get(`https://developer.nps.gov/api/v1/parks?stateCode=${req.query.stateCode}&limit=50&api_key=${process.env.NPS_API_KEY}`)
  .then((response) => {
      console.log('GOT PARK?', req.query.stateCode);
      res.send(response.data.data); //this is the list of parks info from 3rd party API
  })
  .catch((error) => {
      console.log('ERROR GETTING PARK', error);
      res.sendStatus(500); //internal server error
  })
});



module.exports = router;
