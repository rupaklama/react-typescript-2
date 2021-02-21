import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import './code-cell.css';

import Resizable from './resizable';
import { Cell } from '../state/cell';
import { useDispatch } from 'react-redux';
import { updateCell } from '../state/actions/cellsAction';
import { createBundle } from '../state/actions/bundleAction';
import { useTypedSelector } from '../hooks/use-type-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useDispatch();
  const bundle = useTypedSelector(state => state.bundles[cell.id]);

  useEffect(() => {
    // on initial loading we don't have bundle - undefined
    // so, execute the if block, dispatch & exit the useEffect without executing rest of the code below
    if (!bundle) {
      dispatch(createBundle(cell.id, cell.content));
      return;
    }

    const timer = setTimeout(async () => {
      dispatch(createBundle(cell.id, cell.content));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, dispatch]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={value => dispatch(updateCell(cell.id, value))}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
