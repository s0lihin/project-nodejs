import { useEffect, useState } from 'react';
import FttdSetTable from '../../components/FttdSetTable/FttdSetTable';
import GameLayout from '../../layout/GameLayout';
import FttdDescription from '../../components/FttdDescription/FttdDescription';
import { getUserId, getUsername } from '../../services/SecurityService';
import { useDispatch } from 'react-redux';
import GameSTD from '../../components/GameSTD/GameSTD';
import { stdBetType } from '../../services/BetTypeService';
import { countTotalBetAmount } from '../../services/BetAmountService';
import { showAlert } from '../../redux/alert/alert.actions';
import { MAX_BETS, MIN_BETS } from '../../services/RuleService';
import { injectIntl } from 'react-intl';

function FttdSet(props) {

  const dispatch = useDispatch();
  const [rowsDataSet, setRowsDataSet] = useState([]);
  const [rowsData, setRowsData] = useState([]);
  const [showGameSTD, setShowGameSTD] = useState(false);
  const [totalBetAmount, setTotalBetAmount] = useState(0);
  const columns = ['num1', 'num2', 'num3', 'num4', 'bet2D'];

  const handleChange = (event, index) => {
    let numberOnly = /^[0-9\b]+$/;
    let { name, value } = event.target;
    name = name.slice(0, -1);

    if (value.length >= 1 && columns.includes(name)) {
      let nextSibling = document.querySelector(getNextName(name, index));
      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }

    if (event.target.value === '' || numberOnly.test(event.target.value)) {
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

  const handleValueChange = (index, values, name) => {
    const { value } = values;
    updateRowsData(index, value, name)
  }

  const handleBlur = (index) => {
    let { num1, num2, num3, num4, bet2D, bet3D, bet4D, betAll } =  rowsDataSet[index];

    if(num4 !== '' && num3 !== '' && num2 !== '' && num1 !== ''){

      if (betAll >= MIN_BETS['4D.STD'] && betAll <= MAX_BETS['4D.STD']) {
        updateRowsData(index, true, 'checked');
      } else if ((bet2D >= MIN_BETS['2DR.STD'] && bet2D <= MAX_BETS['2DR.STD']) ||
                  (bet3D >= MIN_BETS['3DR.STD'] && bet3D <= MAX_BETS['3DR.STD']) ||
                    (bet4D >= MIN_BETS['4D.STD'] && bet4D <= MAX_BETS['4D.STD'])) {
        updateRowsData(index, true, 'checked');
      }else{
        updateRowsData(index, false, 'checked');
      }

    }else if(num4 !== '' && num3 !== '' && num2 !== '' && num1 === ''){
      
      if (betAll >= MIN_BETS['4D.STD'] && betAll <= MAX_BETS['4D.STD']) {
        updateRowsData(index, true, 'checked')
      } else if ((bet2D >= MIN_BETS['2DR.STD'] && bet2D <= MAX_BETS['2DR.STD']) || 
                  (bet3D >= MIN_BETS['3DR.STD'] && bet3D <= MAX_BETS['3DR.STD'])) {
        updateRowsData(index, true, 'checked');
      }else{
        updateRowsData(index, false, 'checked')
      }

    }else if(num4 !== '' && num3 !== '' && num2 === '' && num1 === ''){

      if (betAll >= MIN_BETS['4D.STD'] && betAll <= MAX_BETS['4D.STD']) {
        updateRowsData(index, true, 'checked');
      } else if (bet2D >= MIN_BETS['2DR.STD'] && bet2D <= MAX_BETS['2DR.STD']) {
        updateRowsData(index, true, 'checked');
      }else{
        updateRowsData(index, false, 'checked');
      }

    }else{
      updateRowsData(index, false, 'checked')
    }

  }

  const updateRowsData = (index, value, name) => {
    const newRowsDataSet = [...rowsDataSet];
    const {modified, num1, num2, num3, num4, bet2D, bet3D, bet4D, betAll} = newRowsDataSet[index];
    const nums = '' + num1 + num2 +num3 + num4;
    const bets = '' + bet2D + bet3D + bet4D + betAll;
    newRowsDataSet[index][name] = value;

    if( modified === false && name === 'checked' && nums.length > 1 && bets !== ''){
      newRowsDataSet[index]['modified'] = true;
    }

    setRowsDataSet(newRowsDataSet);
  }

  const handleSubmit = () => {
    let validRowsDataSet = rowsDataSet
      .filter(function (row) {
        return row.checked;
      });

    if (validRowsDataSet.length === 0) {
      showAlertError(props.intl.formatMessage({ id: 'message.noBet' }));
    } else {
      let requests = [];

      for (let i = 0; i < validRowsDataSet.length; i++) {
        requests = generateSetNumber(requests, validRowsDataSet[i]);
      }

      updateSetNumber(requests);
    }

  }

  const handleReset = () => {
    const rowsDataSet = [];

    for (let i = 0; i < 10; i++) {
      rowsDataSet.push({
        "num1": '',
        "num2": '',
        "num3": '',
        "num4": '',
        "bet2D": '',
        "bet3D": '',
        "bet4D": '',
        "betAll": '',
        "checked": false,
        "modified": false
      })
    }

    setRowsDataSet(rowsDataSet);
    setShowGameSTD(false);
  }

  const generateSetNumber = (requests, row) => {
    let nums = '' + row.num1 + row.num2 + row.num3 + row.num4;

    while (nums.length > 1) {
      let request = {
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
        "checked": true
      }

      if (nums.length === 4) {
        request.num1 = nums[0];
        request.num2 = nums[1];
        request.num3 = nums[2];
        request.num4 = nums[3];

        if (row.betAll) {
          request.betAmountOri = row.betAll;
        } else if(row.bet4D){
          request.betAmountOri = row.bet4D;
        }

      } else if (nums.length === 3) {
        request.num2 = nums[0];
        request.num3 = nums[1];
        request.num4 = nums[2];

        if (row.betAll) {
          request.betAmountOri = row.betAll;
        } else if(row.bet3D) {
          request.betAmountOri = row.bet3D;
        }

      } else if (nums.length === 2) {
        request.num3 = nums[0];
        request.num4 = nums[1];

        if (row.betAll) {
          request.betAmountOri = row.betAll;
        } else if(row.bet2D) {
          request.betAmountOri = row.bet2D;
        }
      }

      if(request.betAmountOri !== ''){
        requests.push(request);
      }
      
      nums = nums.substring(1);
    }

    return requests;
  }

  const updateSetNumber = (rowsData) => {

    for (let index = 0; index < rowsData.length; index++) {
      const { betType, betTypeName, discount } = stdBetType(rowsData[index]);
      rowsData[index]['betType'] = betType;
      rowsData[index]['betTypeName'] = betTypeName;

      rowsData[index]['discount'] = discount;
      rowsData[index]['betAmount'] = rowsData[index]['betAmountOri'] - ((discount / 100) * rowsData[index]['betAmountOri']);
    }

    setRowsData(rowsData);
    setTotalBetAmount(countTotalBetAmount(rowsData));
    setShowGameSTD(true);
  }

  const showAlertError = (message) => {
    dispatch(showAlert('danger', message));
  }

  useEffect(() => {
    handleReset();
  }, []);

  let content = <>
    <FttdSetTable
      rowsDataSet={rowsDataSet}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleValueChange={handleValueChange}
      handleSubmit={handleSubmit}
      handleReset={handleReset} />
    <FttdDescription />
  </>

  if (showGameSTD) {
    content = <GameSTD
      rowsData={rowsData}
      setRowsData={setRowsData}
      totalBetAmount={totalBetAmount}
      handleReset={handleReset}
      handleBack={() => setShowGameSTD(false)} />
  }

  return (
    <GameLayout title='4D/3D/2D Set'>
      {content}
    </GameLayout>
  );
}

export default injectIntl(FttdSet);