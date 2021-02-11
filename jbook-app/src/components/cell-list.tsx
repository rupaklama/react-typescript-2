import React from 'react';

// custom hook to access state in our redux store
import { useTypedSelector } from '../hooks/use-type-selector';

import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
  // This hook takes an arrow func with arg state (global state object) &
  // which part of 'state' we want from Redux Store.
  // Destructuring 'order' & 'data' property of cells state
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map(id => {
      return data[id];
    });
  });

  // console.log(cells);

  const renderedCells = cells.map(cell => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <div>{renderedCells}</div>;
};

export default CellList;
