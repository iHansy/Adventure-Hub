const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//retrieving all adventure
router.get('/', (req, res) => {
  const queryText = `SELECT COUNT("user_adventure_likes".adventure_id), "adventure".id, "date", "park_name", "image_url", "city", 
                    "state", "main_activities", "description", 
                    "completed", "user_adventure_likes".adventure_id, "user".username 
                    FROM "adventure"
                    JOIN "user" ON "adventure".user_id = "user".id
                    FULL OUTER JOIN "user_adventure_likes" ON "adventure".id = "user_adventure_likes".adventure_id
                    GROUP BY "user_adventure_likes".adventure_id, "adventure".id, "user".username
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

//adding or deleting like from database
router.put('/like/:id', rejectUnauthenticated, async (req, res) => {

  //connection for transaction
  const clientConnection = await pool.connect();

  try {

    await clientConnection.query('BEGIN');

    const response = await clientConnection.query(`SELECT * FROM "user_adventure_likes"
                                                  WHERE "user_id" = $1 AND "adventure_id" = $2;`, [req.user.id, req.params.id]);

    if (response.rows.length > 0) {
      await clientConnection.query(`DELETE FROM "user_adventure_likes"
                                    WHERE "user_id" = $1 AND "adventure_id" = $2;`, [req.user.id, req.params.id]);
    } else {
      await clientConnection.query(`INSERT INTO "user_adventure_likes" ("user_id", "adventure_id")
                                    VALUES ($1, $2);`, [req.user.id, req.params.id]);
    }

    await clientConnection.query('COMMIT');

    console.log('ROUTER LIKE');
    res.sendStatus(201); //created status

  } catch (error) {
    console.log('ROUTER ERROR WITH LIKE', error);
    res.sendStatus(500); //internal server error
  } finally {
    clientConnection.release();
  }
});

module.exports = router;
