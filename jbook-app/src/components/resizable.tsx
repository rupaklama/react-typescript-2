import { ResizableBox } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      width={300}
      height={300}
      draggableOpts={direction}
      minConstraints={[100, 100]}
      maxConstraints={[300, 300]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
