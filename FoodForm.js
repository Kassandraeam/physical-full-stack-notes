// imports the useState hook from React 
import { useState } from 'react';

// Main function of the FoodForm component. In its argument, we're sending the object addInventoryItem through it.
// Where does addInventoryItem come from? 
// From App.jsx, we passed in the function addInventoryItem. Line 106.
function FoodForm({ addInventoryItem }) {
  // state variables for form inputs
  let [newItemName, setNewItemName] = useState('');
  let [newItemQuantity, setNewItemQuantity] = useState(0);
  let [newItemMeasure, setNewItemMeasure] = useState('');

  // handle adding new item
  // what does the event in the parentheses mean? 
  // In order to see what the user typed, we need to tie in an event. Every time we have a listener, there is an event. This event has a key on it called event.target.value, which is the same thing as using .val().
  // So now as we type in the console log if we added event.target.value and event in the parentheses, we should be able to see what the user has typed with every keystroke.
  const handleSubmit = (event) => {
    // cancels the event if it is cancelable??
    // A way of stopping the browser from doing the default behavior. This comes from the form tag. It is stopping the page from refreshing and allowing you to use your own JS.
    // Form tag, MUST HAVE IT. <form>
    event.preventDefault();

    // package state variables into object
    const newItem = {
      name: newItemName,
      quantity: newItemQuantity,
      measure: newItemMeasure,
    };

    // reset state
    setNewItemName('');
    setNewItemQuantity(0);
    setNewItemMeasure('');

    // call function on App to do the actual POST
    addInventoryItem(newItem);
  };

  return (
    <section>
      <h2>Add Item to the Pantry</h2>
      {/* when the user presses the button Submit on line 66, it will trigger the function handleSubmit from line 17. */}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        {/* this is just an input on the DOM. We set the type to text, the name equal to the name, the value equal to the object of newItemName, which is the value of name in the object newItem. */}
        {/* onChange event captures the input as it's typed and saves whatever was typed, which is event.target.value to newItemName using setNewItemName.  */}
        <input
          type='text'
          name='name'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />

        <label>Quantity:</label>
        <input
          type='text'
          name='quantity'
          value={newItemQuantity}
          onChange={(event) => setNewItemQuantity(event.target.value)}
        />

        <label>Measure:</label>
        <input
          type='text'
          name='measure'
          value={newItemMeasure}
          onChange={(event) => setNewItemMeasure(event.target.value)}
        />
      
        {/* This triggers the onSubmit which calls the handleSubmit function */}
        <button type='submit'>Add Item</button>
      </form>
    </section>
  );
}

export default FoodForm;
