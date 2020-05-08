import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import UserContext from '../../context/users/usersContext';

const Search = () => {
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);
  const { searchUsers, clearUsers, users } = userContext;
  const { showAlert } = alertContext;
  const [text, setText] = useState('');
  const handleChange = e => {
    setText(e.target.value)
  };
  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      showAlert('Please enter something', 'light');
      return
    }
    searchUsers(text);
    setText('')
  };
  return (
    <div>
      <form action="" className="form" onSubmit={onSubmit}>
        <input type="text" name="text" placeholder="Search user..." value={text} onChange={handleChange} />
        <input type="submit" value="Search" className="btn btn-dark btn-block" />
      </form>
      {users.length > 0 && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
      )}
    </div>
  )
}

export default Search
