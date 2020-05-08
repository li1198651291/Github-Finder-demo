import React, { useReducer} from 'react';
import axios from 'axios';
import UserContext from './usersContext';
import UserReducer from './usersReducer';
import { SEARCH_USERS, CLEAR_USERS, GET_USER, GET_REPOS, SET_LOADING } from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  // 使用本地环境变量
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  // 生产环境变量
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const UserState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    })
  }
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS
    })
  }

  const getUser = async login => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${login}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    dispatch({
      type: GET_USER,
      payload: res.data
    })
    
  }
  const getUserRepos = async login => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  }
  const setLoading = () => dispatch({ type: SET_LOADING});

  return (
    <UserContext.Provider value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;
