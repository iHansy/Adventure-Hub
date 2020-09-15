const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//retrieving all adventure
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "adventure" ORDER BY "date" DESC;`;
  pool.query(queryText)
    .then ((result) => {
      console.log('RETRIEVED ADVENTURE FEED');
      res.send(result.rows);
    })
    .catch ((error) => {
      console.log('error getting adventures query', error);
      res.sendStatus(500);
    })
});

module.exports = router;
