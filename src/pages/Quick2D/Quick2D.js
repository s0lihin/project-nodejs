import NumberFormat from 'react-number-format';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import GameLayout from '../../layout/GameLayout';
import GameSTD from '../../components/GameSTD/GameSTD';
import { generateQuick2DNumbers } from '../../services/Quick2DService';
import { countTotalBetAmount } from '../../services/BetAmountService';
import { stdBetType } from '../../services/BetTypeService';
import { showAlert } from '../../redux/alert/alert.actions';
import FttdDescription from '../../components/FttdDescription/FttdDescription';
import { RESET_ICON, VIEW_VARIATIONS_ICON } from '../../components/Icons/Icons';
import { MAX_BETS, MIN_BETS } from '../../services/RuleService';
import { formatNumber } from '../../services/NumberService';



function Quick2D(props) {
  const dispatch = useDispatch();
  const provider = useSelector(state => state.gameReducer.provider);
  const shift = useSelector(state => state.gameReducer.shift);
  const openingSession = useSelector(state => state.gameReducer.openingSession);
  const [rowsData, setRowsData] = useState([]);
  const [showGameSTD, setShowGameSTD] = useState(false);
  const [totalBetAmount, setTotalBetAmount] = useState(0);
  const [type, setType] = useState('big');
  const [betAmount, setBetAmount] = useState('');

  const onInputBoxChangeValue = (event) => {
    setType(event.target.value);
  }

  const handleValueChange = (values) => {
    const { value } = values;
    setBetAmount(value);
  }

  const showAlertError = (message) => {
    dispatch(showAlert('danger', message));
  }

  const updateQuick2DNumber = (rowsData) => {
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

  const handleSubmit = () => {
    let betTypeName = "2D";
    let minBet = MIN_BETS['2DR.STD'];
    let maxBet = MAX_BETS['2DR.STD'];

    if (betAmount && betAmount >= minBet && betAmount <= maxBet) {
      let requests = generateQuick2DNumbers(type, betAmount);
      updateQuick2DNumber(requests);
    } else {
      minBet = formatNumber(minBet);
      maxBet = formatNumber(maxBet);
      showAlertError(props.intl.formatMessage({ id: 'message.errorMinBetMaxBet' }, { betTypeName, minBet, maxBet }));
    }
  }

  const handleReset = () => {
    setShowGameSTD(false);
    setType('big');
    setBetAmount('');
  }

  let content =
    <>
      <div className='d-flex justify-content-center align-items-center app-form'>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div className='d-md-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column align-items-center app-tcol'>
              <div className='text-center'>
                <div className='d-block'><FormattedMessage id="label.type" defaultMessage="Type" /></div>
              </div>
              <div className='form-check-container'>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="big" checked={'big' === type} onChange={onInputBoxChangeValue}></input>
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    <FormattedMessage id="label.big" defaultMessage="Big" />
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="small" checked={'small' === type} onChange={onInputBoxChangeValue}></input>
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    <FormattedMessage id="label.small" defaultMessage="Small" /></label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="even" checked={'even' === type} onChange={onInputBoxChangeValue}></input>
                  <label className="form-check-label" htmlFor="inlineRadio3">
                    <FormattedMessage id="label.even" defaultMessage="Even" />
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="odd" checked={'odd' === type} onChange={onInputBoxChangeValue}></input>
                  <label className="form-check-label" htmlFor="inlineRadio4">
                    <FormattedMessage id="label.odd" defaultMessage="Odd" />
                  </label>
                </div>
              </div>
            </div>
            <div className='d-flex flex-column align-items-center app-tcol'>
              <div className='d-block'><FormattedMessage id="label.bet" defaultMessage="Bet" /></div>
              <NumberFormat
                type="text"
                maxLength="10"
                inputMode='decimal'
                pattern='\d*'
                name="betAmount"
                value={betAmount}
                placeholder="2D"
                thousandSeparator='.'
                decimalSeparator=','
                fixedDecimalScale={false}
                allowNegative={false}
                onValueChange={(values) => (handleValueChange(values))}
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
      handleReset={handleReset}
      totalBetAmount={totalBetAmount}
      provider={provider}
      shift={shift}
      openingSession={openingSession}
      setRowsData={setRowsData}
      handleBack={() => setShowGameSTD(false)} />
  }

  return (
    <GameLayout title='Quick 2D'>
      {content}
    </GameLayout>

  );
}

export default injectIntl(Quick2D);