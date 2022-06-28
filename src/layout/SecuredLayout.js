import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ActivityDetector from 'react-activity-detector';
import { setBalance } from "../redux/userinfo/userinfo.actions";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import * as SecurityService from '../services/SecurityService';
import { getBalanceAPI } from '../services/CommonService';


function SecuredLayout({ children }) {

    const customActivityEvents = [
        'click', 'mousemove', 'keydown', 'DOMMouseScroll', 'mousewheel', 'mousedown', 'touchstart', 'touchmove', 'focus'
    ];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const onIdle = () => {
        SecurityService.logout();
        navigate("/?logout");
    }

    useEffect(() => {

        (async () => {
            const balance = await getBalanceAPI();
            dispatch(setBalance(balance));
          })()

    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <ActivityDetector activityEvents={customActivityEvents} enabled={true} timeout={30*60*1000} onIdle={onIdle}/>
            <div className="page-container">
                <Navbar />
                <div className='d-block d-md-flex'>
                    <Sidebar />
                    <div className="flex-fill content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SecuredLayout;