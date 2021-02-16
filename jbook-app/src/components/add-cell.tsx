import React from 'react';
import { useDispatch } from 'react-redux';
import { insertCellAfter } from '../state/actions/cellsAction';
import './add-cell.css';

interface AddCellProps {
  nextCellId: string | null;
  isForceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, isForceVisible }) => {
  const dispatch = useDispatch();

  const handleCode = () => {
    dispatch(insertCellAfter(nextCellId, 'code'));
  };

  const handleText = () => {
    dispatch(insertCellAfter(nextCellId, 'text'));
  };

  return (
    <div className={`add-cell ${isForceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <button
          className='button is-rounded is-primary is-small'
          onClick={handleCode}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>Code</span>
        </button>
        <button
          className='button is-rounded is-primary is-small'
          onClick={handleText}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  );
};

export default AddCell;
