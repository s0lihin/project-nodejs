import { injectIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FttdTable from '../FttdTable/FttdTable';
import FttdDescription from '../FttdDescription/FttdDescription';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { postBetAPI } from '../../services/BetService';
import { stdBetType } from '../../services/BetTypeService';
import { countTotalBetAmount } from '../../services/BetAmountService';
import { getBalanceAPI } from '../../services/CommonService';
import { getUserId, getUsername } from '../../services/SecurityService';
import { dateToString, isOpeningSessionValid } from '../../utility/DateUtility';
import { showAlert } from '../../redux/alert/alert.actions';
import { hideLoader, showLoader } from '../../redux/loader/loader.actions';
import { setBalance } from "../../redux/userinfo/userinfo.actions";
import { formatNumber } from '../../services/NumberService';


function GameSTD(props) {

  const dispatch = useDispatch();
  const shift = useSelector(state => state.gameReducer.shift);
  const openingSession = useSelector(state => state.gameReducer.openingSession);
  const balance = useSelector(state => state.userinfoReducer.balance);
  const [totalBetAmount, setTotalBetAmount] = useState(0);
  const [betData, setBetData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [copyFirstBet, setCopyFirstBet] = useState(false);
  const columns = ['num1', 'num2', 'num3', 'num4', 'betAmountOri'];


  const handleChange = (index, event) => {
    let numberOnly = /^[0-9\b]+$/;
    let { name, value } = event.target;
    name = name.slice(0, -1);

    if (value.length >= 1 && columns.includes(name)) {
      let nextSibling = document.querySelector(getNextName(name, index));
      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }

    if (value === '' || numberOnly.test(value)) {
      updateRowsData(index, value, name);
    }
  }

  const getNextName = (name, index) => {
    let i = columns.indexOf(name);

    if (i < 4) {
      return `input[name=${columns[i + 1] + index}]`;
    } else {
      return null;
    }
  }

  const handleBlur = (index, event) => {
    let rowsData = [...props.rowsData];
    let { betType, betTypeName, discount, minBet, maxBet } = stdBetType(rowsData[index]);
    let { name, value } = event.target;

    name = name.slice(0, -1);
    rowsData[index]['betType'] = betType;
    rowsData[index]['betTypeName'] = betTypeName;

    if (copyFirstBet && rowsData[0]['betAmountOri'] > 0 && index !== 0 && betTypeName) {

      rowsData[index]['checked'] = true;
      rowsData[index]['betAmountOri'] = rowsData[0]['betAmountOri'];
      rowsData[index]['discount'] = discount;
      rowsData[index]['betAmount'] = rowsData[0]['betAmountOri'] - ((discount / 100) * rowsData[0]['betAmountOri']);

    } else if (copyFirstBet && index === 0 && betTypeName && rowsData[index]['betAmountOri'] >= minBet && rowsData[index]['betAmountOri'] <= maxBet) {

      rowsData[index]['checked'] = true;
      rowsData[index]['betAmountOri'] = rowsData[0]['betAmountOri'];
      rowsData[index]['discount'] = discount;
      rowsData[index]['betAmount'] = rowsData[0]['betAmountOri'] - ((discount / 100) * rowsData[0]['betAmountOri']);

      for (let i = 1; i < rowsData.length; i++) {
        if (rowsData[i]['checked']) {
          rowsData[i]['betAmountOri'] = rowsData[0]['betAmountOri'];
          rowsData[i]['betAmount'] = rowsData[0]['betAmountOri'] - ((rowsData[i]['discount'] / 100) * rowsData[0]['betAmountOri']);
        }
      }

    } else if (betTypeName && rowsData[index]['betAmountOri'] >= minBet && rowsData[index]['betAmountOri'] <= maxBet) {
      rowsData[index]['checked'] = true;
      rowsData[index]['discount'] = discount;
      rowsData[index]['betAmount'] = rowsData[index]['betAmountOri'] - ((discount / 100) * rowsData[index]['betAmountOri']);
    } else if (betTypeName && value !== '' && name === 'betAmountOri') {
      rowsData[index]['checked'] = false;
      rowsData[index]['discount'] = '';
      rowsData[index]['betAmount'] = '';

      minBet = formatNumber(minBet);
      maxBet = formatNumber(maxBet);
      showAlertError(props.intl.formatMessage({ id: 'message.errorMinBetMaxBet' }, { betTypeName, minBet, maxBet }));
    } else {
      rowsData[index]['checked'] = false;
      rowsData[index]['discount'] = '';
      rowsData[index]['betAmount'] = '';
    }

    setTotalBetAmount(countTotalBetAmount(rowsData));
    props.setRowsData(rowsData);
  }

  const handleValueChange = (index, values, name) => {
    const { value } = values;
    updateRowsData(index, value, name);
  }

  const updateRowsData = (index, value, name) => {
    const rowsData = [...props.rowsData];
    rowsData[index][name] = value;
    setTotalBetAmount(countTotalBetAmount(rowsData));
    props.setRowsData(rowsData);
  }


  const handleOnCheck = (index, event) => {
    const rowsData = [...props.rowsData];

    if (rowsData[index]['betAmount']) {
      rowsData[index]['checked'] = event.target.checked;
    } else {
      showAlertError(props.intl.formatMessage({ id: 'message.dataNotValid' }));
    }

    setTotalBetAmount(countTotalBetAmount(rowsData));
    props.setRowsData(rowsData);
  }

  const handleCopyFirstBet = (event) => {
    setCopyFirstBet(event.target.checked);

    if (event.target.checked && props.rowsData[0]['checked']) {
      const rowsData = [...props.rowsData];

      for (let i = 1; i < rowsData.length; i++) {
        if (rowsData[i]['checked']) {
          rowsData[i]['betAmountOri'] = props.rowsData[0]['betAmountOri'];
          rowsData[i]['betAmount'] = props.rowsData[0]['betAmountOri'] - ((rowsData[i]['discount'] / 100) * props.rowsData[0]['betAmountOri']);
        }
      }

      props.setRowsData(rowsData);

    }

  }

  const handleShowModal = () => {
    let tempBetData = props.rowsData
      .filter(function (row) {
        return row.checked;
      });

    if (tempBetData.length === 0) {
      showAlertError(props.intl.formatMessage({ id: 'message.noBet' }));
      return;
    }

    if (!isOpeningSessionValid(openingSession)) {
      showAlertError(props.intl.formatMessage({ id: 'message.invalidDate' }));
      return;
    }

    if (!shift) {
      showAlertError(props.intl.formatMessage({ id: 'message.invalidShift' }));
      return;
    }

    if (balance > totalBetAmount) {
      tempBetData = tempBetData.map(row => {
        let result = {};
        result["userId"] = row["userId"];
        result["username"] = row["username"];
        result["providerName"] = shift.providerName;
        result["betOn"] = row["num1"] + row["num2"] + row["num3"] + row["num4"] + '';
        result["betAmount"] = row["betAmountOri"];
        result["betType"] = row["betType"];
        result["openingSession"] = dateToString(openingSession);
        result["shift"] = shift.shift;
        return result;
      });

      setBetData(tempBetData);
      setShowModal(true);
    } else {
      showAlertError(props.intl.formatMessage({ id: 'message.insufficientBalance' }));
    }
  };

  const handleOkModal = () => {
    if (betData && betData.length > 0) {
      setShowModal(false);
      dispatch(showLoader());

      postBetAPI(betData)
        .then(function (response) {

          if (response.data && response.data.length > 0) {
            const status = response.data[0].status;

            if (status === "UNPROCESSABLE_ENTITY") {
              showAlertError(props.intl.formatMessage({ id: 'message.betFailed' }) + ` (${response.data[0].body})`);
            } else {
              setBetData([]);
              props.handleReset();
              showAlertSuccess(props.intl.formatMessage({ id: 'message.betSuccessful' }));
              updateBalance();
            }
          } else {
            showAlertError(props.intl.formatMessage({ id: 'message.betFailed' }));
          }

          setTimeout(() => {
            dispatch(hideLoader());
          }, 500);

        })
        .catch(function (error) {
          setTimeout(() => {
            dispatch(hideLoader());
            showAlertError(props.intl.formatMessage({ id: 'message.betFailed' }) + ` (${error.message})`);
          }, 500);
        });
    }
  }

  const handleAddRow = () => {
    const rowsData = [...props.rowsData, {
      "userId": getUserId(),
      "username": getUsername(),
      "providerName": '',
      "betOn": '',
      "betAmountOri": '',
      "discount": '',
      "betAmount": '',
      "betType": '',
      "betTypeName": '',
      "openingSession": '',
      "shift": 1,
      "num1": '',
      "num2": '',
      "num3": '',
      "num4": '',
      "checked": false
    }];
    props.setRowsData(rowsData);
    setTimeout(() => {
      const num10 = document.querySelector('input[name=num10]');
      if (num10 !== null) {
        num10.focus();
        num10.blur();
      }
    }, 100);
  }


  const showAlertError = (message) => {
    dispatch(showAlert('danger', message));
  }

  const showAlertSuccess = (message) => {
    dispatch(showAlert('success', message));
  }

  const updateBalance = async () => {
    try {
      const balance = await getBalanceAPI();
      dispatch(setBalance(balance));
    } catch (error) {
      dispatch(showAlert('danger', error.message));
    }
  };

  const handleReset = () => {
    setBetData([]);
    setTotalBetAmount(countTotalBetAmount(props.rowsData));
    props.handleReset();
  }

  useEffect(() => {
    setTotalBetAmount(countTotalBetAmount(props.rowsData));

    (async () => {
      try {
        await getBalanceAPI();
      } catch (error) {
        dispatch(showAlert('danger', error.message));
      }
    })();

  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ConfirmationModal
        showModal={showModal}
        message={props.intl.formatMessage({ id: 'message.placeBets' })}
        handleCloseModal={() => setShowModal(false)}
        handleOkModal={handleOkModal} />

      <FttdTable
        rowsData={props.rowsData}
        handleChange={handleChange}
        handleValueChange={handleValueChange}
        totalBetAmount={totalBetAmount}
        handleReset={handleReset}
        handleSubmit={handleShowModal}
        handleOnCheck={handleOnCheck}
        handleBlur={handleBlur}
        handleAddRow={handleAddRow}
        copyFirstBet={copyFirstBet}
        handleCopyFirstBet={handleCopyFirstBet}
        handleBack={props.handleBack} />
      <FttdDescription />
    </>
  );
}

export default injectIntl(GameSTD);