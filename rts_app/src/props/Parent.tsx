import { ChildTwo } from './Child';

const Parent = () => {
  return <ChildTwo color='red' onClick={() => console.log('Clicked')}>hi</ChildTwo>;
};

export default Parent;
