import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import ReactPaginate from 'react-paginate';
import HistoryTable from '../../components/HistoryTable/HistoryTable';
import OpeningSessionCalendar from '../../components/OpeningSessionCalendar/OpeningSessionCalendar';
import SecuredLayout from '../../layout/SecuredLayout';
import { getAndCountStatementByDate, getStatementByDate } from '../../services/StatementService';
import { addDate } from '../../utility/DateUtility';
import { showAlert } from '../../redux/alert/alert.actions';
import { hideLoader, showLoader } from '../../redux/loader/loader.actions';


function History(props) {

  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const [openingSession, setOpeningSession] = useState(new Date());
  const [rowsData, setRowsData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const handleDatePicker = async (date) => {
    try {
      setOpeningSession(date);
      setPage(0);
      dispatch(showLoader());
      const { data, count } = await getAndCountStatementByDate(date, itemsPerPage, 0);
      setPageCount(Math.ceil(count / itemsPerPage));
      setRowsData(data);
      closeLoader();
    } catch (error) {
      closeLoader();
      showAlertError(props.intl.formatMessage({ id: 'message.errorOnGet' }) + ` (${error.message})`);
    }
  }

  const handlePageClick = async (event) => {
    try {
      setPage(event.selected);
      dispatch(showLoader());
      const { data } = await getStatementByDate(openingSession, itemsPerPage, event.selected);
      setRowsData(data);
      closeLoader();
    } catch (error) {
      closeLoader();
      showAlertError(props.intl.formatMessage({ id: 'message.errorOnGet' }) + ` (${error.message})`);
    }
  };

  const showAlertError = (message) => {
    dispatch(showAlert('danger', message));
  }

  const closeLoader = () => {
    setTimeout(() => {
      dispatch(hideLoader());
    }, 500);
  }

  useEffect(() => {

    (async () => {
      try {
        dispatch(showLoader());
        const { data, count } = await getAndCountStatementByDate(openingSession, itemsPerPage, page);
        setPageCount(Math.ceil(count / itemsPerPage));
        setRowsData(data);
        closeLoader();
      } catch (error) {
        closeLoader();
        showAlertError(props.intl.formatMessage({ id: 'message.errorOnGet' }) + ` (${error.message})`);
      }
    })()

  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SecuredLayout>
      <div className='w-100'>
        <div className="d-flex justify-content-center align-items-center">
          <div className="content-box">
            <div className="content-header navbar navbar-secondary bg-secondary d-flex align-items-center">
              <div className="d-flex me-auto fs-6 text-uppercase text-shadow">
                <FormattedMessage id="menu.history" defaultMessage="History" />
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center ms-4">
              <div className='d-flex  justify-content-center align-items-center my-3'>
                <div className='me-2 text-white text-shadow d-md-inline-block'><FormattedMessage id="label.date" defaultMessage="Date" /></div>
                <OpeningSessionCalendar
                  openingSession={openingSession}
                  maxDate={addDate(3)}
                  handleDatePicker={handleDatePicker} />
              </div>
            </div>
            <div className='w-100'>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <HistoryTable rowsData={rowsData} offset={itemsPerPage * page} />
                <div className='my-3'>
                  <ReactPaginate
                    nextLabel="&raquo;"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="&laquo;"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SecuredLayout>
  );
}

export default injectIntl(History);