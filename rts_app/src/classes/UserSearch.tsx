import { Component } from 'react';

// props interface
interface UserSearchProps {
  // array of objects
  users: { name: string; age: number }[];
}

// object interface
interface UserSearchState {
  name: string;

  // object or undefined
  user: { name: string; age: number } | undefined;
}

class UserSearch extends Component<UserSearchProps> {
  // component states
  state: UserSearchState = {
    name: '',
    user: undefined,
  };

  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // filter - returns an object inside of a new array
    // find - returns an object only
    const foundUser = this.props.users.find(
      user => user.name === this.state.name
    );

    // set found 'user object' in user state
    this.setState({ user: foundUser });
  };

  render() {
    return (
      <div>
        <h3>Users Search</h3>
        <input
          type='text'
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <button onClick={this.handleClick}>Find User</button>
        <div>
          {/* if user object is defined, print name & age property. In react, this is like if/else */}
          {this.state.user && this.state.user.name} {''}
          {this.state.user && this.state.user.age}
        </div>
      </div>
    );
  }
}

export default UserSearch;
