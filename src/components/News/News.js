import { injectIntl } from 'react-intl';
import { getUsername } from '../../services/SecurityService';
import './News.scss';

function News(props) {
  
  return (
    <div className='container-fluid news'>
      <div className="row">
        <div className='col-12'>
          <div className='scroll-text'>
            <p>{props.intl.formatMessage({ id: 'message.welcome' })} <span className='fw-bold'>{getUsername()}</span> !!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default injectIntl(News);