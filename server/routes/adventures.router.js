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
  const {date, image_url, park_name, city, state, main_activities, description, completed} = req.body;
  const queryText = `INSERT INTO "adventure" 
                    ("date", "image_url", "park_name", "city", 
                    "state", "main_activities", "description", "completed", "user_id")
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
  pool.query(queryText, [date, image_url, park_name, city, state, main_activities, description, completed, req.user.id])
    .then((result) => {
      res.sendStatus(201); //sending created status back to client
    })
    .catch((error) => {
      console.log('ERROR CREATING ADVENTURE', error);
      res.sendStatus(500); //internal server error
    })

});

//changing adventure from future to complete
router.put('/mark-complete/:id', rejectUnauthenticated, (req, res) => {
  console.log('MARK COMPLETE ROUTER', req.params.id);
  const {date, image_url, park_name, city, state, main_activities, description} = req.body;
  const queryText = `UPDATE "adventure"
                    SET "date" = $1,
                    "image_url" = $2,
                    "park_name" = $3,
                    "city" = $4,
                    "state" = $5,
                    "main_activities" = $6,
                    "description" = $7,
                    "completed" = $8
                    WHERE "id" = $9 AND "user_id" = $10;`;
  pool.query(queryText, [date, image_url, park_name, city, state, main_activities, description, true, req.params.id, req.user.id])
    .then((result) => {
      res.sendStatus(201); //sending created status back to client
    })
    .catch((error) => {
      console.log('ERROR MARKING ADVENTURE COMPLETE', error);
      res.sendStatus(500); //internal server error
    })
});

//updating entire adventure
router.put('/edit-adventure/:id', rejectUnauthenticated, (req, res) => {
  const {image_url, park_name, city, state, main_activities, description} = req.body;
  const queryText = `UPDATE "adventure"
                    SET "date" = $1
                    "image_url" = $2,
                    "park_name" = $3,
                    "city" = $4,
                    "state" = $5,
                    "main_activities" = $6,
                    "description" = $7
                    WHERE "id" = $8 AND "user_id" = $9;`;
  pool.query(queryText, [date, image_url, park_name, city, state, main_activities, description, req.params.id, req.user.id])
    .then((result) => {
      res.sendStatus(201); //created status
    })
    .catch((error) => {
      console.log('ERROR UPDATING ADVENTURE', error);
      res.sendStatus(500); //internal server error
    })
})

module.exports = router;
