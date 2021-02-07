import './text-editor.css';
import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState('Start writing on this editor...');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // this func will be call whenever user clicks anywhere inside of our Document
    const listener = (e: MouseEvent) => {
      // target event property returns the element that triggered the event
      // meaning to find out which element does a user just clicked
      // console.log(e.target);

      // ref.current - Check to see if 'ref' is pointing to the 'div'
      // e.target - to click an element that does exists
      // ref.current.contains - an element that got 'click' is or isn't inside of the 'div'

      // contains() method returns a Boolean value indicating whether a node is a descendant of a specified node
      // Node - referring to HTML element, e.target is going to be Node element - div
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        // console.log('element clicked on is inside editor');
        return; // if inside, exit the loop & stay inside
      }

      setEditing(false);
    };
    // due to some change in react 17, pass { capture: true } as third arg
    // which is to make click event work
    document.addEventListener('click', listener, { capture: true });

    // clean up - if we ever decide to stop showing text editor on the screen
    // return () => {
    //   document.removeEventListener('click', listener, { capture: true });
    // };
  }, []);

  const handleClick = () => {
    setEditing(true);
  };

  if (editing) {
    // editing window
    return (
      // if user clicks inside this div here, don't want to close the editor
      // To do so, add on a 'ref' here & determine whether or not
      // 'e.target' is an element inside of this div
      <div ref={ref} className='text-editor'>
        <MDEditor value={value} onChange={v => setValue(v || '')} />
      </div>
    );
  }

  return (
    // preview window
    <div onClick={handleClick} className='text-editor card'>
      <div className='card-content'>
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
