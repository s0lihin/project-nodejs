import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../redux/sidebar/sidebar.actions';
import { SidebarData } from './SidebarData';
import NumberFormat from 'react-number-format';
import { injectIntl } from 'react-intl';
import './Sidebar.scss';


function Sidebar(props) {

  const location = useLocation();
  const dispatch = useDispatch();
  const isSidebarActive = useSelector(state => state.sidebarReducer.isSidebarActive);
  const balance = useSelector(state => state.userinfoReducer.balance);

  const hideSidebar = () => {
    if (isSidebarActive) {
      dispatch(toggleSidebar());
    }
  }

  const getClassName = (path) => {
    if (location.pathname === path) {
      return 'sidebar-menu-item selected';
    } else {
      return 'sidebar-menu-item';
    }
  }

  const sidebarElement = SidebarData.map((data, index) => (
    <div key={index} className='sidebar-menu'>
      <div className='sidebar-menu-header' key={index}>{data.title}</div>
      {
        data.menus.map((subdata, subindex) => {
          return (
            <Link key={index + subindex} to={subdata.link} onClick={hideSidebar} className={getClassName(subdata.link)}>{subdata.name}</Link>
          );
        })
      }
    </div>
  ))

  return (
    <div className={isSidebarActive ? 'sidebar active' : 'sidebar'}>
      <div className='sidebar-info d-flex flex-column'>
        <span>{props.intl.formatMessage({ id: 'label.balance' })}</span>
        <div className='d-flex'>
          <span className='me-1'>IDR</span>
          <NumberFormat
            type="text"
            displayType='text'
            value={balance ? balance : 0}
            thousandSeparator='.'
            decimalSeparator=','
            allowNegative={false}
            decimalScale={2}
            fixedDecimalScale={true} />
        </div>
      </div>
      {sidebarElement}
    </div>
  );
}

export default injectIntl(Sidebar);