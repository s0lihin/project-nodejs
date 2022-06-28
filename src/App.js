import AppRoutes from './AppRoutes';
import Loader from './components/Loader/Loader';
import AlertToast from './components/AlertToast/AlertToast';
import { useSelector } from 'react-redux';
import { LocaleWrapper } from './i18n/LocaleWrapper';
import './App.scss';


function App() {

  const isLoaderActive = useSelector(state => state.loaderReducer.isLoaderActive);

  return (
    <LocaleWrapper >
      <Loader isLoaderActive={isLoaderActive} />
      <AlertToast />
      <AppRoutes />
    </LocaleWrapper>
  )
}

export default App;
