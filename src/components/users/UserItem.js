import React from 'react';
import imgsrc from '../../image/图片加载失败.png';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const UserItem = ({ user }) => {
  return (
    <div className="card text-center">
      <img
        src={user.avatar_url}
        alt=""
        className="round-img"
        style={{ width: '60px' }}
        onError={(e) => e.target.src = imgsrc}
      />
      <h3>
        {user.login}
      </h3>
      <div>
        <Link
          to={`user/${user.login}`}
          className="btn btn-dark btn-sm my-1"
        >more</Link>
      </div>
    </div>
  )
}
UserItem.propTypes = {
  user: PropTypes.object
}
// UserItem.imgerror = e => {
//   var img = e.target;
//   img.src = imgsrc;
//   img.onerror = null;
// }
export default UserItem;

