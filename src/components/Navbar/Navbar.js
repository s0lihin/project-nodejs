import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../redux/sidebar/sidebar.actions';
import * as SecurityService from '../../services/SecurityService';
import { FormattedMessage, injectIntl } from "react-intl";
import { LocaleContext } from '../../i18n/LocaleWrapper';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import logo from '../../images/logo.png'
import './Navbar.scss';

function Navbar(props) {

  const { locale, selectLanguage } = React.useContext(LocaleContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isSidebarActive = useSelector(state => state.sidebarReducer.isSidebarActive);

  const isActive = (href) => {
    return location.pathname.includes(href) ? 'nav-link active' : 'nav-link';
  }

  const logout = () => {
    setShowModal(true);
  }

  const handleOkModal = () => {
    SecurityService.logout();
    navigate("/?logout");
  }

  const iconMenu = () => {
    if (isSidebarActive) {
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" /></svg>
    } else {
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" /></svg>
    }
  }

  const hideSidebar = () => {
    if (isSidebarActive) {
      dispatch(toggleSidebar());
    }
  }

  const handleSelectLocale = (eventKey) => {
    selectLanguage(eventKey);
  }

  const getLocale = () => {
    return locale.toUpperCase();
  }

  return (
    <>
      <ConfirmationModal showModal={showModal} message={props.intl.formatMessage({ id: 'message.logout' })} handleCloseModal={() => setShowModal(false)} handleOkModal={handleOkModal} />
      <div className={isSidebarActive ? 'sidebar-overlay' : ''} onClick={hideSidebar}></div>
      <nav className='navbar shadow fixed-top py-1 d-flex justify-content-center align-items-center'>
            <div className='navbar-container'>
              <div className='d-flex me-auto'>
                <button type="button" className="btn-toggle d-lg-none" onClick={() => dispatch(toggleSidebar())}>
                  {iconMenu()}
                </button>
                <div className='d-flex align-items-center justify-content-center'>
                  <img className='logo align-middle' alt='infini4D' src={logo} />
                </div>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to='/game' onClick={hideSidebar} className={isActive('/game')}>
                      <FormattedMessage id="menu.game" defaultMessage="Game" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/result' onClick={hideSidebar} className={isActive('/result')}>
                      <FormattedMessage id="menu.result" defaultMessage="Result" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/history' onClick={hideSidebar} className={isActive('/history')}>
                      <FormattedMessage id="menu.history" defaultMessage="History" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <DropdownButton variant="dark" align="end" title={getLocale()} onSelect={handleSelectLocale} id="locale">
                  <Dropdown.Item eventKey='id'>
                    <span className='fs-7 text-uppercase me-2'>Indonesia</span>
                    <span className="fs-9 p-1 badge bg-secondary">ID</span></Dropdown.Item>
                  <Dropdown.Item eventKey='en'>
                    <span className='fs-7 text-uppercase me-2'>English</span>
                    <span className="fs-9 p-1 badge bg-secondary">EN</span></Dropdown.Item>
                </DropdownButton>
                <button type="button" className="btn btn-dark" onClick={logout}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z" /></svg>
                </button>
              </div>
            </div>
      </nav>
    </>
  );
}

export default injectIntl(Navbar);