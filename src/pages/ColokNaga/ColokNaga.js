import { useEffect, useState } from 'react';
import { injectIntl } from "react-intl";
import GameLayout from '../../layout/GameLayout';
import { getUserId, getUsername } from '../../services/SecurityService';
import { countTotalBetAmount } from '../../services/BetAmountService';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import NagaTable from '../../components/NagaTable/NagaTable';
import { useDispatch, useSelector } from 'react-redux';
import { bet } from '../../services/BetService';
import { getBalanceAPI } from '../../services/CommonService';
import { showAlert } from '../../redux/alert/alert.actions';
import { dateToString, isOpeningSessionValid } from '../../utility/DateUtility';
import { hideLoader, showLoader } from '../../redux/loader/loader.actions';
import { setBalance } from "../../redux/userinfo/userinfo.actions";
import NagaDescription from '../../components/NagaDescription/NagaDescription';
import { getDiscounts, MAX_BETS, MIN_BETS } from '../../services/RuleService';
import { formatNumber } from '../../services/NumberService';


function ColokNaga(props) {

  const betType = 'NAGA';
  const betTypeName = 'Colok Naga';
  const dispatch = useDispatch();
  const shift = useSelector((state) => state.gameReducer.shift);
  const openingSession = useSelector(state => state.gameReducer.openingSession);
  const balance = useSelector(state => state.userinfoReducer.balance);
  const [betData, setBetData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rowsData, setRowsData] = useState([]);
  const [totalBetAmount, setTotalBetAmount] = useState(0);
  const columns = ['num1', 'num2', 'num3', 'betAmountOri'];

  const initRowsData = () => {
    const request = [];

    for (let i = 0; i < 10; i++) {
      request.push({
        "userId": getUserId(),
        "username": getUsername(),
        "providerName": '',
        "betOn": '',
        "betAmountOri": '',
        "discount": '',
        "betAmount": '',
        "openingSession": '',
        "shift": 1,
        "num1": '',
        "num2": '',
        "num3": '',
        "modified": false,
        "checked": false
      })
    }

    return request;
  }

  const showAlertError = (message) => {
    dispatch(showAlert('danger', message));
  }

  const showAlertSuccess = (message) => {
    dispatch(showAlert('success', message));
  }

  const updateRowsData = (index, value, name) => {
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setTotalBetAmount(countTotalBetAmount(rowsInput));
    setRowsData(rowsInput);
  }

  const handleValueChange = (index, values, name) => {
    const { value } = values;
    updateRowsData(index, value, name);
  }

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
    let newRowsData = [...rowsData];
    let { name, value } = event.target;
    let { num1, num2, num3, betAmountOri } = newRowsData[index];
    let discount = getDiscounts(betType);
    let minBet = MIN_BETS[betType];
    let maxBet = MAX_BETS[betType];

    name = name.slice(0, -1);

    if ((value !== '' && name === 'betAmountOri' && num1 !== '' && num2 !== '' && num3 !== '') ||
      (value !== '' && name === 'num1' && betAmountOri !== '' && num2 !== '' && num3 !== '') ||
      (value !== '' && name === 'num2' && betAmountOri !== '' && num1 !== '' && num3 !== '') ||
      (value !== '' && name === 'num3' && betAmountOri !== '' && num1 !== '' && num2 !== '')) {

      newRowsData[index]['modified'] = true;
    }

    if (num1 !== '' && num2 !== '' && num3 !== '' && (num1 === num2 || num1 === num3 || num2 === num3)) {
      newRowsData[index]['num1'] = '';
      newRowsData[index]['num2'] = '';
      newRowsData[index]['num3'] = '';
      newRowsData[index]['discount'] = '';
      newRowsData[index]['betAmount'] = '';
      newRowsData[index]['betAmountOri'] = '';
      showAlertError(props.intl.formatMessage({ id: 'message.numberMustBeDifferent' }));

    } else if ((num1 !== '' && num2 !== '' && num3 !== '' && value !== '' && name === 'betAmountOri') ||
      (betAmountOri !== '' && num2 !== '' && num3 !== '' && value !== '' && name === 'num1') ||
      (betAmountOri !== '' && num1 !== '' && num3 !== '' && value !== '' && name === 'num2') ||
      (betAmountOri !== '' && num1 !== '' && num2 !== '' && value !== '' && name === 'num3')) {


      if (betAmountOri >= minBet && betAmountOri <= maxBet) {
        newRowsData[index]['checked'] = true;
        newRowsData[index]['discount'] = discount;
        newRowsData[index]['betAmount'] = betAmountOri - ((discount / 100) * betAmountOri);
      } else {
        newRowsData[index]['checked'] = false;
        newRowsData[index]['discount'] = '';
        newRowsData[index]['betAmount'] = '';
        minBet = formatNumber(minBet);
        maxBet = formatNumber(maxBet);
        showAlertError(props.intl.formatMessage({ id: 'message.errorMinBetMaxBet' }, { betTypeName, minBet, maxBet }));
      }

    } else {
      newRowsData[index]['checked'] = false;
      newRowsData[index]['discount'] = '';
      newRowsData[index]['betAmount'] = '';
    }

    setTotalBetAmount(countTotalBetAmount(newRowsData));
    setRowsData(newRowsData);
  }

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = () => {
    let _totalBetAmount = 0;
    let tempBetData = rowsData
      .filter(function (row) {
        return row.checked;
      });

    if (tempBetData.length === 0) {
      showAlertError('Bet belum ada');
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

    if (balance > _totalBetAmount) {
      tempBetData = tempBetData.map(row => {
        let result = {};

        result["userId"] = row["userId"];
        result["username"] = row["username"];
        result["providerName"] = shift.providerName;
        result["betOn"] = row["num1"] + row["num2"] + row["num3"];
        result["betAmount"] = parseInt(row["betAmountOri"]);
        result["betType"] = betType
        result["openingSession"] = dateToString(openingSession);
        result["shift"] = shift.shift;

        return result;
      });

      setBetData(tempBetData);
      setShowModal(true);
    } else {
      showAlertError(props.intl.formatMessage({ id: 'message.insufficientBalance' }));
    }

  }

  const handleOkModal = () => {
    if (betData && betData.length > 0) {
      setShowModal(false);
      dispatch(showLoader());

      bet(betData)
        .then(function (response) {

          if (response.data && response.data.length > 0) {
            const status = response.data[0].status;

            if (status === "UNPROCESSABLE_ENTITY") {
              showAlertError(props.intl.formatMessage({ id: 'message.betFailed' }) + ` (${response.data[0].body})`);
            } else {
              handleReset();
              showAlertSuccess(props.intl.formatMessage({ id: 'message.betSuccessful' }));
              updateBalance();
            }
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

  const updateBalance = async () => {
    try {
      const balance = await getBalanceAPI();
      dispatch(setBalance(balance));
    } catch (error) {
      showAlertError(props.intl.formatMessage({ id: 'message.errorOnGet' }) + ` (${error.message})`);
    }
  }

  const handleReset = () => {
    setRowsData(initRowsData());
    setBetData([]);
  }

  useEffect(() => {
    setRowsData(initRowsData());
  }, []);

  return (
    <GameLayout title='Colok Naga'>
      <ConfirmationModal showModal={showModal} message='Lanjut bet?' handleCloseModal={handleCloseModal} handleOkModal={handleOkModal} />

      <NagaTable
        rowsData={rowsData}
        handleChange={handleChange}
        handleValueChange={handleValueChange}
        totalBetAmount={totalBetAmount}
        handleSubmit={handleShowModal}
        handleReset={handleReset}
        handleBlur={handleBlur} />

      <NagaDescription />
    </GameLayout>
  );
}

export default injectIntl(ColokNaga);