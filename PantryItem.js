// PantryItem.js

// I commented this out because it doesn't use useState anywhere.
// import { useState } from 'react';

// 
function PantryItem({ item, changeQuantity }) {

  // let [showMeasurement, setShowMeasurement] = useState(false);

  return (
    <tr key={item.id}>
      
      <td>{item.name}</td>
      {/* highlight if we're getting low */}
      {item.quantity < 6 ?
        <td className="low">{item.quantity} {item.measure}</td> :
        <td>{item.quantity} {item.measure}</td> 
      }

      <td>
        <button onClick={() => changeQuantity(item, 'up')}>Add 1 to Qty</button>
        <button onClick={() => changeQuantity(item, 'down')}>Subtract 1 from Qty</button>
      </td>
    </tr>
  );

}

export default PantryItem;
