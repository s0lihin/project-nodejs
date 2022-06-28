import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SecuredLayout from '../../layout/SecuredLayout';
import ResultTable from '../../components/ResultTable/ResultTable';
import { getWinBetOn } from '../../services/WinBetService';
import { showAlert } from '../../redux/alert/alert.actions';
import { getProviders } from '../../services/CommonService';
import { Dropdown } from 'react-bootstrap';
import { hideLoader, showLoader } from '../../redux/loader/loader.actions';
import { FormattedMessage, injectIntl } from 'react-intl';


function Result(props) {

  const dispatch = useDispatch();
  const [shift, setShift] = useState();
  const [shiftsGroup, setShiftsGroup] = useState([]);
  const [rowsData, setRowsData] = useState([]);

  const handleSelectShift = (eventKey) => {
    let values = Object.values(shiftsGroup);

    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values[i].length; j++) {
        let shift = values[i][j];

        if (shift.labelName === eventKey) {
          setShift(shift);
          fetchData(shift)
          break;
        }
      }
    }
  }

  const fetchData = (shift) => {
    dispatch(showLoader());

    getWinBetOn(shift)
      .then(function (response) {
        setRowsData(response.data);

        setTimeout(() => {
          dispatch(hideLoader());
        }, 500);
      })
      .catch(function (error) {
        setTimeout(() => {
          dispatch(hideLoader());
        }, 500);

        showAlertError(props.intl.formatMessage({ id: 'message.errorOnGet' }) + ` (${error.message})`);
      });
  }

  const showAlertError = (message) => {
    dispatch(showAlert('danger', message));
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await getProviders();
        setShiftsGroup(data.shiftsGroup);
      } catch (error) {
        showAlertError(props.intl.formatMessage({ id: 'message.errorOnGet' }) + ` (${error.message})`);
      }
    })();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SecuredLayout>
      
        <div className="d-flex justify-content-center justify-content-xl-end align-items-center">
          <div className="content-box">
            <div className="content-header navbar navbar-secondary bg-secondary d-flex align-items-center">
              <div className="d-flex me-auto fs-6 text-uppercase text-shadow">
                <FormattedMessage id="menu.result" defaultMessage="Result" />
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center ms-4">
              <div className='d-flex  justify-content-center align-items-center my-3'>
                <div className='me-2 text-white text-shadow'><FormattedMessage id="label.provider" defaultMessage="Provider" /></div>
                <Dropdown onSelect={handleSelectShift} className="app-dropdown">
                  <Dropdown.Toggle variant='warning' id="multi-column" className='text-white'>
                    <span className="fs-9 me-2 text-capitalize">{shift ? shift.providerName : ''}</span>
                    <span>{shift ? shift.time : props.intl.formatMessage({ id: 'label.select' })}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className='d-flex flex-wrap dropdown-group'>
                      {
                        Object.keys(shiftsGroup).map((key, j) => (
                          <div key={j} className='d-flex flex-column'>
                            {
                              shiftsGroup[key].map((sh, i) => (
                                <Dropdown.Item key={sh.providerName + sh.shift} eventKey={sh.labelName}>
                                  <span className="fs-9 me-2 text-capitalize">{sh.providerName}</span><span className="fw-bold">{sh.time}</span>
                                </Dropdown.Item>
                              ))
                            }
                          </div>
                        ))
                      }
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className='w-100'>
              <div className="d-flex justify-content-center align-items-center">
                <ResultTable rowsData={rowsData} />
              </div>
            </div>
          </div>
        </div>
 
    </SecuredLayout>
  );
}

export default injectIntl(Result);