import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../redux/loader/loader.actions';
import { setBalance } from "../../redux/userinfo/userinfo.actions";
import { LOGOUT_ICON, NOT_LOGIN_ICON, WARNING_ICON } from '../../components/Icons/Icons';
import PublicLayout from '../../layout/PublicLayout';
import { isLoggedIn } from '../../services/SecurityService';
import { checkTokenAPI, getBalanceWithIdAndToken } from '../../services/CommonService';
import { CookiesConstant, removeAllCookies, setCookies } from '../../services/CookiesService';
import { LocaleContext } from '../../i18n/LocaleWrapper';
import logo from '../../images/logo.png'
import './Home.scss';
import { getAllBetTypes } from '../../services/BetTypeService';


function Home({ intl }) {

  const { selectLanguage } = React.useContext(LocaleContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [icon, setIcon] = useState('');
  const [message, setMessage] = useState('');
  const [detail, setDetail] = useState(null);


  const showLoginContent = () => {
    setType('info');
    setIcon(NOT_LOGIN_ICON);
    setMessage(intl.formatMessage({ id: 'message.notLogged' }));
  }

  const showLoginErrorContent = (error) => {
    let errorMessage = '';
    setType('danger');
    setIcon(WARNING_ICON);

    if (error.response && error.response.data) {
      errorMessage = error.response.data.description;
    } else {
      errorMessage = error.message;
      if (error.config) {
        const { baseURL, url } = error.config;
        setDetail(`Can not connect to ${baseURL}${url}`);
      }
    }

    setMessage(intl.formatMessage({ id: 'message.loginFailed' }, { errorMessage }));
  }

  const showLogoutContent = () => {
    setType('success');
    setIcon(LOGOUT_ICON)
    setMessage(intl.formatMessage({ id: 'message.loggedOut' }));
  }

  const checkToken = async () => {
    try {
      removeAllCookies();
      const params = new URLSearchParams(window.location.search);
      const language = params.get('language');
      const gameId = params.get('gameId');

      setCookies(CookiesConstant.GAME_ID, gameId);
      selectLanguage(language);

      const data = await checkTokenAPI(window.location.search);

      const balance = await getBalanceWithIdAndToken(data);
      dispatch(setBalance(balance));

      await getAllBetTypes(data.token);
      navigate('/game/4d3d2d');
      
    } catch (error) {
      showLoginErrorContent(error);
    }
  };

  const main = () => {
    if (window.location.search && window.location.search.includes('token')) {
      checkToken();
    } else if (window.location.search && window.location.search.includes('logout')) {
      showLogoutContent();
    } else if (isLoggedIn()) {
      navigate('/game/4d3d2d');
    } else {
      showLoginContent();
    }
  }

  useEffect(() => {
    dispatch(showLoader());

    setTimeout(() => {
      dispatch(hideLoader());
      main();
    }, 500);

  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const detailError = () => {
    if (detail) {
      return <div className='mt-2 fs-7 text-break text-center text-light'>{detail}</div>;
    }
  }

  return (
    <PublicLayout>
      <div className='d-flex align-items-center justify-content-center vh-100 home'>
        <div className='header'>
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <img className='logo' src={logo} alt="infini4D" />
          </div>
        </div>
        <div className={'container-fluid message ' + type}>
          <div className="d-flex flex-column justify-content-center align-items-center ">
            <div>{icon}</div>
            <div className='mt-3 fs-5 text-break text-center'>
              <div className='mt-3 fs-5 text-break text-center'>{message}</div>
            </div>
            {detailError()}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default injectIntl(Home);