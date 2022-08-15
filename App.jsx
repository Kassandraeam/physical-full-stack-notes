// imports the hooks useState, and useEffect from 'react'
import { useState, useEffect } from 'react';

// imports App.css which allows us to alter the display of this jsx file?
import './App.css';

// import axios is the React's version of ajax. 
import axios from 'axios';

// import PantryTable from FilePath allows us to use the data from that Component in App.jsx?
import PantryTable from '../PantryTable/PantryTable';

// import AddFoodForm from FilePath allows us to use the data from that Component in App.jsx?
import AddFoodForm from '../FoodForm/FoodForm';


// We have one BIG function called App. This will contain all of our GET/POST/PUT/DELETE requests. 
function App() {
  // start with an empty array

  // This is a state variable. [variable, howWeChangeTheVariable] = useState is a HOOK from react. Inside of the parentheses, we set what we want the initial value of our state variable to be.
  // In this case, we are setting inventoryList equal to an empty array.
  let [inventoryList, setInventoryList] = useState([]);


  // Runs when the component is first put on the DOM
  // useEffect is another HOOK that we import from React. 
  // useEffect is React's version of onReady with jQuery. The function inside of useEffect will run on page load. There will be an empty array at the end of this function to make useEffect run only once.
  useEffect(() => {
    getInventory();
  }, []);


   // Get data from server
   // This is our GET function. We create a const function and then call axios inside of it.
   const getInventory = () => {
    axios
      // this is the url we are accessing on the server side?
      .get('/inventory') 
      // After we successfully GET the information from the server, we take in the response FROM the server and use it to change the content of inventoryList. We change it by calling setInventoryList and putting
      // response.data inside of the setInventoryList.
      .then((response) => {
        // array of inventory objects saved to state array
        setInventoryList(response.data);
      })
      // If we are unable to get the information from the server we run an alert on the DOM, and an error should appear on the client side terminal.
      .catch((error) => {
        alert(`Couldn't get inventory. Try again later`);
        console.log('Error getting inventory', error);
      });
  };
  
  
  // Post to server 
  // We are POSTing newItem (we define and capture newItem in the FoodForm) to the Server via axios.
  const addInventoryItem = (newItem) => {
  // '/inventory' is the route, newItem is the data we're passing.
    axios
      .post('/inventory', newItem)
      .then((response) => {
      // after a successful post, we refresh the DOM by calling the GET which is getInventory.
        getInventory();
      })
      .catch((error) => {
        alert(`Couldn't add inventory item. Try again later`);
        console.log('Error adding to inventory', error);
      });
  };

  // Change quantity on server
  // function that takes in item and direction. if direction is equal to 'up', item.quantity increases by one.
  // decreases if direction is equal to down.
  // Note that the if/else conditional is within the FUNCTION part of App. Not the return. Which is jsx.
  const changeQuantity = (item, direction) => {
    
    if (direction === 'up') {
      item.quantity += 1;
    } else if (direction === 'down') {
      item.quantity -= 1;
    } else {
      console.log('Need to pass in direction of up or down');
    }

    //route and we're selecting item.id? sending item.quantity.
    axios
      .put(`/inventory/quantity/${item.id}`, { quantity: item.quantity })
      .then((response) => {
        getInventory();
      })
      .catch((error) => {
        alert(`Couldn't update inventory count. Try again later`);
        console.log('Error updating inventory count', error);
      });
  };

  // JSX is contained in the return of the App function. This is our html stuff.
  return (
    <>
      <header>
        <h1>Welcome to Panda Pantry</h1>
      </header>
      <main>
        {/* SENDING TO the component AddFoodForm, we give it variable name called addInventory and set it equal to the data we're sending over. */}
        {/* <COMPONENT howWeCallIt = {dataWeAreSending} /> */}
        {/* This is sending over the POST route to the AddFoodForm component*/}
        <AddFoodForm addInventoryItem={addInventoryItem}/>
        
        {/* Sending over the the state variable: inventoryList (after it has been set) and the function changeQuantity to the component PantryTable*/}
        <PantryTable inventoryList={inventoryList} changeQuantity={changeQuantity}
        />
      </main>
    </>
  );
}

export default App;
