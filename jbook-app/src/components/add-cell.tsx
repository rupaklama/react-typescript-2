import React from 'react';
import { useDispatch } from 'react-redux';
import { insertCellBefore } from '../state/actions/cellsAction';
import './add-cell.css';

interface AddCellProps {
  nextCellId: string;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const dispatch = useDispatch();

  const handleCode = () => {
    dispatch(insertCellBefore(nextCellId, 'code'));
  };

  const handleText = () => {
    dispatch(insertCellBefore(nextCellId, 'text'));
  };

  return (
    <div>
      <button onClick={handleCode}>Code</button>
      <button onClick={handleText}>Text</button>
    </div>
  );
};

export default AddCell;
