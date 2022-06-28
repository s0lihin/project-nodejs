import { useDispatch, useSelector } from 'react-redux';
import { hideLoader } from '../../redux/loader/loader.actions';
import './Loader.scss';

function Loader() {

    const dispatch = useDispatch();
    const isLoaderActive = useSelector(state => state.loaderReducer.isLoaderActive);
    
    return (
        <div className={isLoaderActive ? 'loader overlay' : ''} onClick={() => dispatch(hideLoader())}>
            <div className='lds-facebook'><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader;
