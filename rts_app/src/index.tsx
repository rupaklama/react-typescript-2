import ReactDOM from 'react-dom';
import EventComponent from './events/EventComponent';
import GuestList from './state/GuestList';
import UserSearch from './refs/UserSearch';


const App = () => {
  return (
    <div>
      <GuestList />
      
      <br/>
      <EventComponent />

      <br/>
      <UserSearch />
    </div>
  )
}

export default App;

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
