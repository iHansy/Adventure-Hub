const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//retrieving all adventure
router.get('/', (req, res) => {
  const queryText = `SELECT COUNT("user_adventure_likes".user_id), "adventure".id, "date", "park_name", "image_url", "city", 
                    "state", "main_activities", "description", 
                    "completed", "user_adventure_likes".user_id, "user".username 
                    FROM "adventure"
                    JOIN "user" ON "adventure".user_id = "user".id
                    FULL OUTER JOIN "user_adventure_likes" ON "adventure".id = "user_adventure_likes".adventure_id
                    GROUP BY "user_adventure_likes".user_id, "adventure".id, "user".username
                    ORDER BY "date" DESC;
                    `;
  pool.query(queryText)
    .then((result) => {
      console.log('RETRIEVED ADVENTURE FEED');
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error getting adventures query', error);
      res.sendStatus(500);
    })
});

//adding like to database
router.post('/like/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `INSERT INTO "user_adventure_likes"
                    ("user_id", "adventure_id")
                    VALUES ($1, $2);`;
  pool.query(queryText, [req.user.id, req.params.id])
    .then((result) => {
      console.log('ROUTER LIKED ADVENTURE', req.params.id);
      res.sendStatus(201); //status created
    })
    .catch((error) => {
      console.log('ROUTER ERROR ADDING LIKE', error);
    })
});

module.exports = router;
