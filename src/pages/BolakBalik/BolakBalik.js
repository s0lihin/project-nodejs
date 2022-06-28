import { useDispatch } from 'react-redux';
import GameLayout from '../../layout/GameLayout';
import NumberFormat from 'react-number-format';
import { generatePermutationNumbers } from '../../services/CalculatorService';
import GameSTD from '../../components/GameSTD/GameSTD';
import { countTotalBetAmount } from '../../services/BetAmountService';
import { stdBetType } from '../../services/BetTypeService';
import { showAlert } from '../../redux/alert/alert.actions';
import { useState } from 'react';
import FttdDescription from '../../components/FttdDescription/FttdDescription';
import { FormattedMessage, injectIntl } from 'react-intl';
import { RESET_ICON, VIEW_VARIATIONS_ICON } from '../../components/Icons/Icons';
import { MAX_BETS, MIN_BETS } from '../../services/RuleService';
import { formatNumber } from '../../services/NumberService';

function BolakBalik(props) {

  const dispatch = useDispatch();
  const [data, setData] = useState({
    'num1': '',
    'num2': '',
    'num3': '',
    'num4': '',
    'num5': '',
    'bet2D': '',
    'bet3D': '',
    'bet4D': '',
    'betAll': '',
  });
  const [rowsData, setRowsData] = useState([]);
  const [showGameSTD, setShowGameSTD] = useState(false);
  const [totalBetAmount, setTotalBetAmount] = useState(0);
  const columns = ['num1', 'num2', 'num3', 'num4', 'num5', 'bet2D'];

  const handleChange = (event) => {
    let { name, value } = event.target;

    if (value.length >= 1 && columns.includes(name)) {
      let nextSibling = document.querySelector(getNextName(name));
      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }

    updateData(name, value);
  }

  const getNextName = (name) => {
    let i = columns.indexOf(name);

    if (i < 6) {
      return `input[name=${columns[i + 1]}]`;
    } else {
      return null;
    }
  }

  const updateData = (name, value) => {
    const newData = { ...data };
    newData[name] = value;
    setData(newData);
  }

  const handleValueChange = (values, name) => {
    const { value } = values;
    const newData = { ...data }
    newData[name] = value;
    setData(newData);
  }

  const showAlertError = (message) => {
    dispatch(showAlert('danger', message));
  }

  const handleSubmit = () => {
    const { num1, num2, num3, num4, num5, bet2D, bet3D, bet4D, betAll } = data;
    let valid = false;

    if ((num5 !== '' && num4 !== '' && num3 !== '' && num2 !== '' && num1 !== '') ||
      (num5 !== '' && num4 !== '' && num3 !== '' && num2 !== '' && num1 === '')) {

      if ((betAll >= MIN_BETS['4D.STD'] && betAll <= MAX_BETS['4D.STD']) ||
        ((bet2D >= MIN_BETS['2DR.STD'] && bet2D <= MAX_BETS['2DR.STD']) ||
          (bet3D >= MIN_BETS['3DR.STD'] && bet3D <= MAX_BETS['3DR.STD']) ||
          (bet4D >= MIN_BETS['4D.STD'] && bet4D <= MAX_BETS['4D.STD']))) {
        valid = true;
      }

    } else if (num5 !== '' && num4 !== '' && num3 !== '' && num2 === '' && num1 === '') {

      if (
        (betAll >= MIN_BETS['4D.STD'] && betAll <= MAX_BETS['4D.STD']) ||
        ((bet2D >= MIN_BETS['2DR.STD'] && bet2D <= MAX_BETS['2DR.STD']) ||
          (bet3D >= MIN_BETS['3DR.STD'] && bet3D <= MAX_BETS['3DR.STD']))) {
        valid = true;
      }

    } else if (num5 !== '' && num4 !== '' && num3 === '' && num2 === '' && num1 === '') {

      if ((betAll >= MIN_BETS['4D.STD'] && betAll <= MAX_BETS['4D.STD']) ||
        (bet2D >= MIN_BETS['2DR.STD'] && bet2D <= MAX_BETS['2DR.STD'])) {
        valid = true;
      }

    }

    if (valid) {
      let requests = generatePermutationNumbers(data);
      updateSetNumber(requests);
    } else {
      let betTypeName = "2D,3D,4D";
      let minBet = MIN_BETS['2DR.STD'];
      let maxBet = MAX_BETS['4D.STD'];

      minBet = formatNumber(minBet);
      maxBet = formatNumber(maxBet);
      showAlertError(props.intl.formatMessage({ id: 'message.errorMinBetMaxBet' }, { betTypeName, minBet, maxBet }));
    }

  }

  const handleReset = () => {
    setData({
      'num1': '',
      'num2': '',
      'num3': '',
      'num4': '',
      'num5': '',
      'bet2D': '',
      'bet3D': '',
      'bet4D': '',
      'betAll': ''
    });
    setShowGameSTD(false);
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

  let content =
    <>
      <div className='d-flex justify-content-center align-items-center app-form'>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div className='d-md-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column align-items-center app-tcol'>
              <div className='text-center'>
                <div className='d-block'><FormattedMessage id="label.combination" defaultMessage="Combination" /></div>
                <div className='d-block fs-7'>(<FormattedMessage id="label.maxDigit" defaultMessage="max" values={{ num: 5 }} />)</div>
              </div>
              <div className='d-flex'>
                <input
                  type="text"
                  name='num1'
                  maxLength="1"
                  inputMode='decimal'
                  placeholder='X'
                  pattern='\d*'
                  value={data.num1}
                  onChange={(event) => (handleChange(event))}
                  className="form-control one-digit" />
                <input
                  type="text"
                  name='num2'
                  maxLength="1"
                  inputMode='decimal'
                  placeholder='X'
                  pattern='\d*'
                  value={data.num2}
                  onChange={(event) => (handleChange(event))}
                  className="form-control one-digit" />
                <input
                  type="text"
                  name='num3'
                  maxLength="1"
                  inputMode='decimal'
                  placeholder='X'
                  pattern='\d*'
                  value={data.num3}
                  onChange={(event) => (handleChange(event))}
                  className="form-control one-digit" />
                <input
                  type="text"
                  name='num4'
                  maxLength="1"
                  inputMode='decimal'
                  placeholder='X'
                  pattern='\d*'
                  value={data.num4}
                  onChange={(event) => (handleChange(event))}
                  className="form-control one-digit" />
                <input
                  type="text"
                  name='num5'
                  maxLength="1"
                  inputMode='decimal'
                  placeholder='X'
                  pattern='\d*'
                  value={data.num5}
                  onChange={(event) => (handleChange(event))}
                  className="form-control one-digit" />
              </div>
            </div>
            <div className='d-flex flex-column align-items-center app-tcol'>
              <div className='d-block'><FormattedMessage id="label.bet" defaultMessage="Bet" /></div>
              <div className='d-flex align-items-center'>
                <div className='d-flex flex-column align-items-center'>
                  <div className='d-block fs-7'>(2D)</div>
                  <NumberFormat
                    type="text"
                    maxLength="10"
                    inputMode='decimal'
                    pattern='\d*'
                    name="bet2D"
                    placeholder='2D'
                    value={data.bet2D}
                    thousandSeparator='.'
                    decimalSeparator=','
                    fixedDecimalScale={false}
                    allowNegative={false}
                    onValueChange={(values) => (handleValueChange(values, 'bet2D'))}
                    className="form-control money" />
                </div>
                <div className='d-flex flex-column align-items-center'>
                  <div className='d-block fs-7'>(3D)</div>
                  <NumberFormat
                    type="text"
                    maxLength="10"
                    inputMode='decimal'
                    pattern='\d*'
                    name="bet3D"
                    placeholder='3D'
                    value={data.bet3D}
                    thousandSeparator='.'
                    decimalSeparator=','
                    fixedDecimalScale={false}
                    allowNegative={false}
                    onValueChange={(values) => (handleValueChange(values, 'bet3D'))}
                    className="form-control money" />
                </div>
                <div className='d-flex flex-column align-items-center'>
                  <div className='d-block fs-7'>(4D)</div>
                  <NumberFormat
                    type="text"
                    maxLength="10"
                    inputMode='decimal'
                    pattern='\d*'
                    name="bet4D"
                    placeholder='4D'
                    value={data.bet4D}
                    thousandSeparator='.'
                    decimalSeparator=','
                    fixedDecimalScale={false}
                    allowNegative={false}
                    onValueChange={(values) => (handleValueChange(values, 'bet4D'))}
                    className="form-control money" />
                </div>
              </div>
            </div>
            <div className='d-flex flex-column align-items-center app-tcol'>
              <div className='text-center'>
                <div className='d-block'><FormattedMessage id="label.betAll" defaultMessage="Bet All" /></div>
                <div className='d-block text-light fs-7'>(2D, 3D,4D)</div>
              </div>
              <NumberFormat
                type="text"
                maxLength="10"
                inputMode='decimal'
                pattern='\d*'
                name="betAll"
                placeholder='2D,3D,4D'
                value={data.betAll}
                thousandSeparator='.'
                decimalSeparator=','
                fixedDecimalScale={false}
                allowNegative={false}
                onValueChange={(values) => (handleValueChange(values, 'betAll'))}
                className="form-control money" />
            </div>
          </div>

        </div>
      </div>
      <div className='d-flex justify-content-center align-items-center pe-2'>
        <div className="d-block text-center text-md-end w-100 my-3">
          <button type="reset" className="glossy-button glossy-button-black me-1" onClick={handleReset}>
            {RESET_ICON}
            <span><FormattedMessage id="button.reset" defaultMessage="Reset" /></span>
          </button>
          <button type="button" className="glossy-button glossy-button-red" onClick={handleSubmit}>
            {VIEW_VARIATIONS_ICON}
            <span><FormattedMessage id="button.view.variations" defaultMessage="View Variations" /></span>
          </button>
        </div>
      </div>
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
    <GameLayout title='Bolak Balik'>
      {content}
    </GameLayout>
  );
}


export default injectIntl(BolakBalik);
