import { Toast, ToastContainer } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../../redux/alert/alert.actions';
import { INVALID_ICON, VALID_ICON } from '../Icons/Icons';
import './AlertToast.scss';

function AlertToast() {

    const dispatch = useDispatch();
    const showAlert = useSelector(state => state.alertReducer.showAlert);
    const alertType = useSelector(state => state.alertReducer.alertType);
    const alertMessage = useSelector(state => state.alertReducer.alertMessage);

    return (
        <ToastContainer className={showAlert ? 'app-toast-container' : 'd-none'}>
            <Toast onClose={() => dispatch(hideAlert())} show={showAlert} delay={4000}>
                <Toast.Header>
                    <strong className="me-auto">{alertType === 'danger' ? 'Error' : 'Info'}</strong>
                </Toast.Header>
                <Toast.Body>
                    <div className={alertType === 'danger' ? 'text-danger svg-shadow my-3' : 'text-success svg-shadow my-3'}>
                        {alertType === 'danger' ? INVALID_ICON : VALID_ICON}
                    </div>
                    <div className='mb-3'>{alertMessage}</div>
                    <button type="button" className="btn btn-dark btn-sm" onClick={() => dispatch(hideAlert())}>OK</button>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default AlertToast;