import React, {useContext} from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import UserContext from '../../context/users/usersContext';



const Users = () => {
  const userContext = useContext(UserContext);
  const { loading, users } = userContext;
  if (loading) {
    return <Spinner />
  } else {
    return (
      <div style={userStyle}>
        {users.map((item) => (
          <UserItem user={item} key={item.id} />
        ))}
      </div>
    )
  }
}
Users.propTypes = {
  users: PropTypes.array,
  loading: PropTypes.bool
}
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem"
}

export default Users
