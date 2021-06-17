import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className='buttonDiv'>
          <div className='buttonModalDiv'>
            <LoginFormModal />
          </div>
          <div className='buttonModalDiv'>
            <SignupFormModal />
          </div>

        </div>
      </>
    );
  }

  return (
    <header className='navigationBar'>
      <div className='NavBarNavLinkDiv'>
        <NavLink exact to="/" className='NavBarNavLink'>Home</NavLink>
      </div>
      <div className='NavBarNavLinkDiv'>
        <NavLink exact to='/Upload' className='NavBarNavLink' user={sessionUser}>
          Upload
        </NavLink>
      </div>
      <div className='navigationBarProfile'>
        {isLoaded && sessionLinks}
      </div>
    </header>
  );
}

export default Navigation;