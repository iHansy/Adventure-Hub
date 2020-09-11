const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "adventure" WHERE "user_id" = $1 ORDER BY "date";`;
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

//DELETE route
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
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
