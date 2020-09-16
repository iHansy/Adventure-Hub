const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//retrieving all adventure
router.get('/', (req, res) => {
  const queryText = `SELECT "adventure".id, "date", "park_name", "image_url", "city", 
                    "state", "main_activities", "description", "completed", "user_id", "user".username 
                    FROM "adventure"
                    JOIN "user" ON "adventure".user_id = "user".id;
                    `;
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
