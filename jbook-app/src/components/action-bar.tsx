import React from 'react';
import './action-bar.css';
import { useDispatch } from 'react-redux';
import { deleteCell, moveCell } from '../state/actions/cellsAction';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const dispatch = useDispatch();

  const handleUp = () => {
    dispatch(moveCell(id, 'up'));
  };

  const handleDown = () => {
    dispatch(moveCell(id, 'down'));
  };

  const handleDelete = () => {
    dispatch(deleteCell(id));
  };

  return (
    <div className='action-bar'>
      <button className='button is-primary is-small' onClick={handleUp}>
        <span className='icon'>
          <i className='fas fa-arrow-up' />
        </span>
      </button>
      <button className='button is-primary is-small' onClick={handleDown}>
        <span className='icon'>
          <i className='fas fa-arrow-down' />
        </span>
      </button>
      <button className='button is-primary is-small' onClick={handleDelete}>
        <span className='icon'>
          <i className='fas fa-times' />
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
