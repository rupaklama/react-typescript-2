import { useState } from 'react';

const users = [
  { name: 'indira', age: 28 },
  { name: 'rupak', age: 29 },
  { name: 'sajina', age: 45 },
];


const UserSearch: React.FC = () => {
  const [name, setName] = useState('');

  // user state holds an user object
  const [user, setUser] = useState<{ name: string; age: number } | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // filter - returns an object inside of a new array
    // find - returns an object only
    const foundUser = users.find(user => user.name === name);

    console.log(foundUser);
    // set found 'user object' in user state
    setUser(foundUser);

    setName('');
  };

  return (
    <div>
      <h3>Users Search</h3>
      <input type='text' value={name} onChange={handleChange} />
      <button onClick={handleClick}>Find User</button>
      <div>
        {/* if user object is defined, print name & age property. In react, this is like if/else */}
        {user && user.name} {''}
        {user && user.age}
      </div>
    </div>
  );
};

export default UserSearch;
