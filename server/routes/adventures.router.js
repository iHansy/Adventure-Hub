const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//retrieving all adventure
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "adventure" WHERE "user_id" = $1 ORDER BY "date" DESC;`;
  //if using req.user, need to use rejectUnauthenticated
  //user is automatically being passed to router
  pool.query(queryText, [req.user.id])
    .then ((result) => {
      res.send(result.rows);
    })
    .catch ((error) => {
      console.log('error getting adventures query', error);
      res.sendStatus(500);
    })
});

//retrieving inputs for 1 specific adventure
router.get('/:id', (req, res) => {
  const queryText = `SELECT * FROM "adventure"
                    WHERE "id" = $1`
  pool.query(queryText, [req.params.id])
    .then ((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('ERROR FETCHING ADVENTURE INPUT DETAILS', error);
      res.sendStatus(500); //internal server error
    })
})

//deleting adventure
router.delete('/:id', (req, res) => {
  console.log('ROUTER', req.params);
  const queryText = `DELETE FROM "adventure" WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(202); //accepted status
    })
    .catch ((error) => {
      console.log('ERROR DELETING ADVENTURE', error);
      res.sendStatus(500); //internal server error
    })
});

//adding new adventure
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('POST ROUTER', req.body);
  const queryText = `INSERT INTO "adventure" 
                    ("image_url", "park_name", "city", 
                    "state", "main_activities", "description", "completed", "user_id")
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
  pool.query(queryText, [req.body.image_url, req.body.park_name, req.body.city, 
                        req.body.state, req.body.main_activities, req.body.description,
                        req.body.completed, req.user.id])
    .then((result) => {
      res.sendStatus(201); //sending created status back to client
    })
    .catch((error) => {
      console.log('ERROR CREATING ADVENTURE', error);
      res.sendStatus(500); //internal server error
    })

});

//changing adventure from future to complete
router.put('/mark-complete/:id', (req, res) => {
  console.log('MARK COMPLETE ROUTER', req.params.id);
  const queryText = `UPDATE "adventure"
                    SET "completed" = true
                    WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(201); //sending created status back to client
    })
    .catch((error) => {
      console.log('ERROR MARKING ADVENTURE COMPLETE', error);
      res.sendStatus(500); //internal server error
    })
});

module.exports = router;
