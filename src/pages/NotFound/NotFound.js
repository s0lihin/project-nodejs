import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <div className="d-flex justify-content-center align-items-center">
            <div className='d-flex flex-column justify-content-center align-items-center not-found'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z"/></svg>
              <h5 className='text-center text-shadow'>Halaman tidak ditemukan</h5>
              <Link className='btn btn-sm btn-primary mt-3' to='/'>www.infini4d.com</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;