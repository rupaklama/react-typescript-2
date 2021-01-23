
interface ChildProps {
  color: string;
  onClick: () => void; // since its onClick function, we might don't need to return any value
}

export const Child = ({color, onClick}: ChildProps) => {
  return (
    <div>
        {color}
        <button onClick={onClick}>Click me</button>
    </div>
  )
}

// NOTE: If we want to access additional default React Child Component props, use this approach. 
// NOTE: Another way to define React Function component with Typescript Annotation,
// doing so will have it access to - React Child Default Props OR Children props - <App>{children}</App>
export const ChildTwo: React.FC<ChildProps> = ({color, onClick, children}) => {
  return (
    <div>
      {color} {''}
      {children} {''}
      <button onClick={onClick}>Click me</button>
    </div>
  )
}

// React Child components get the 'default props'
// ChildTwo.displayName 
