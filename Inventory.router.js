// /server/inventory.router.js
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// Setup a GET route to get all the inventory items. the '/' means everything?
router.get('/', (req, res) => {
  // Here we set a constant equal to what we'd enter into the SQL database. Think of this as command for Postico. We'd write this in Postico and then run it.
  const sqlText = `SELECT * FROM inventory ORDER BY name;`;
  //Pool is how we connect the server to the database. From the Server, we send a query. That query being whatever we set sqlText equal to.
  pool.query(sqlText)
  // On a successful get, we send the results back to the Client GET in the form of Rows.
    .then((result) => {
      res.send(result.rows);
    })
    // On a failure, we console.log an error and send an error message on the Server.
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500); // Good server always responds
    })
})

// POST route to ADDS a new inventory item 
// body expected with name, quantity & measure
router.post('/', (req, res) => {
  // newItem is set equal req.body. req.body is whatever data the POST client sent over. In this case, the POST CLIENT had newItem in its parentheses, which is what it sends over. Where does newItem come from? It came from the FoodForm which captured these inputs.
  const newItem = req.body;
  // sqlText is whatever command we send to Postico. The $1, $2, $3 are sanitized inputs. Meaning that SQL won't trust these inputs? 
  const sqlText = `INSERT INTO inventory (name, quantity, measure) 
      VALUES ($1, $2, $3)`;
  // Here we're sending the query which is sqlText. We're also sending over the data that we received from the CLIENT POST, to the server. This is in the form of newItem.name, etc. req.body.name would also work. Where do name, quanity and measure come from? These are the columns that had been set inside of Postico.
  pool.query(sqlText, [newItem.name, newItem.quantity, newItem.measure])
    .then((result) => {
  // On success, sends a good status.
      res.sendStatus(201);
    })
    .catch((error) => {
  //on error, sends error message.
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500); // Good server always responds
    })
})

// PUT will modify the quantity of an inventory item by id
// The body needs to contain the new quantity for the item
// PUT will MODIFY the things in the Database. Why is it '/quantity/:id'? 
// '/quantity/:id' is our route parameter. We are going to quantity, and then to the ID of that quantity?
router.put('/quantity/:id', (req, res) => {
  // We create a variable and set it equal to req.params.id. What is req.params.id? req.params.id is the 'id' property of, in this case, quantity.
  let idToUpdate = req.params.id;

  // We create a variable named quantity and set it equal to req.body.quantity. Why req.body.quantity? 
  // req.body is whatever data we sent over from the PUT CLIENT. Where is the .quantity coming from? 
  // The value that PUT CLIENT sent over has a key of quantity that was declared in the FoodForm.
  let quantity = req.body.quantity;

  if (!quantity) {
    // If we don't get expected quantity, send back bad status
    res.sendStatus(500);
    return; // Do it now, don't run code below
  }

// Same thing with this sqlText. A command for Postico.
// Updating the Postico inventory, but we're setting quantity equal to whatever the second input is, where the id is equal to whatever element we chose?
  let sqlText = `UPDATE inventory SET quantity=$2 WHERE id=$1`;
// When we update in a PUT request on the server side, we need two query arguments. first is the command that goes into Postico. Second is an array. 
  pool.query(sqlText, [idToUpdate, quantity])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    })
})

// allows us to use this elsewhere?
module.exports = router;
