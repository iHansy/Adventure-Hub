const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//retrieving all adventure
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log(req.query.stateCode);
  axios.get(`https://developer.nps.gov/api/v1/parks?stateCode=${req.query.stateCode}&limit=15&api_key=P84BIfX0NZywDyNDZcON6dlT5vSXTbSeWbGExq0n`)
  .then((response) => {
      console.log('GOT PARK?')
      res.send(response.data.data);
  })
  .catch((error) => {
      console.log('ERROR GETTING PARK', error);
      res.sendStatus(500); //internal server error
  })
});



module.exports = router;
