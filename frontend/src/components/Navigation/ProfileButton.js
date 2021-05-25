import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';



function ProfileButton({ user }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const toEditProfile = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.getProfileById(user));
  }

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <NavLink to={`/users/${sessionUser.id}`}>
              <button onClick={toEditProfile}>Profile</button>
            </NavLink>
          </li>
          <li>
            <div>
              {user && (
                <div>
                  <h1>{user.display_name}</h1>
                  <img
                    style={{ width: "150px" }}
                    src={user.avatar_img}
                    alt="profile"
                  />
                </div>
              )}
            </div>
          </li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )
      }
    </>
  );
}

export default ProfileButton;