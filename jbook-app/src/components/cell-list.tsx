import React from 'react';

// custom hook to access state in our redux store
import { useTypedSelector } from '../hooks/use-type-selector';

import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
  // This hook takes an arrow func with arg state (global state object) &
  // which part of 'state' we want from Redux Store.
  // Destructuring 'order' & 'data' property of cells state
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    // CellList needs to get 'data' & 'order', then combine the two
    // We are going to map over 'order' array & look each 'id' one by one
    // NOTE: The 'order' array which indicates an order how the cell should be present in the screen
    return order.map(id => {
      // then for each 'id', we are going to into our 'data' object,
      // find the correct 'cell' with that id &
      // return that 'cell'
      return data[id];
    });
  });

  // rendering list of cells
  const renderedCells = cells.map(cell => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <div>{renderedCells}</div>;
};

export default CellList;