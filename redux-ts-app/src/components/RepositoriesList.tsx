import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state';
import { fetchRepositories } from '../state/action-creators';


const RepositoriesList: React.FC = () => {

  // useDispatch hook to dispatch an action creator
  const dispatch = useDispatch();

  // useSelector hook to get access to repositories state in redux store
  // naming same as our 'repositories' state in combineReducers - key
  // This hook takes an arrow func with arg state (global state object) & 
  // which part of state we want from combineReducers. 
  const { data, error, loading }= useSelector((state: RootState) => state.repositories);
  // DefaultRootState Error meaning whenever we make use of useSelector,
  // useSelector really has no idea about what type of data is inside Redux Store &
  // no information is communicated from Redux to React-Redux side of things. So,
  // we have to write Annotation to help React-Redux understand what type of data is argument - (state)

  const [term, setTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(fetchRepositories(term));

    setTerm('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={term} onChange={handleChange} />
        <button>Search</button>
      </form>
        {/* this is like if condition, if condition is true, execute the code or display h3 */}
        {error && <h3>{error}</h3>}
        {loading && <h3>Loading...</h3>}
        {!error && !loading && 
          data.map((name, i) => (<div key={i}>{name}</div>))}
    </div>
  )
}

export default RepositoriesList
