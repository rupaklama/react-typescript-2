import { useState } from 'react';

const GuestList: React.FC = () => {
  const [name, setName] = useState('');
  // never[] - typescript assumes this is array which is going to be forever 'empty'
  // default type definition , Generic <S> to be Array of Strings here
  const [guests, setGuests] = useState<string[]>([]);
  // console.log(guests);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setGuests([...guests, name]);
    setName('');
  }

  return (
    <div>
      <h3>Guest List</h3>
      <ul>
        { guests.map((guest, i) => (
          <li key={i}>{guest}</li>
        ))}
      </ul>
      <input type='text' value={name} onChange={handleChange} />
      <button onClick={handleClick}>Add Guest</button>
    </div>
  );
};

export default GuestList;
