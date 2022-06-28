import { FormattedMessage } from 'react-intl';
import { Form } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { ADD_ROW_ICON, BACK_ICON, BET_ICON, RESET_ICON } from '../Icons/Icons';
import FttdRow from '../FttdRow/FttdRow';
import './FttdTable.scss';


function FttdTable(props) {

    const backButton = () => {
        if (typeof props.handleBack === "function") {
            return <button type="button" className="glossy-button glossy-button-black me-1" onClick={props.handleBack}>
                {BACK_ICON}
                <span><FormattedMessage id="button.back" defaultMessage="Back" /></span>
            </button>
        } else {
            return ''
        }
    }

    const copyFirstBet = () => {
        if (typeof props.handleBack === "function") {
            return '';
        } else {
            return <div className='d-flex justify-content-center align-items-center app-copy-bet app-check-input'>
                <Form.Check
                    checked={props.copyFirstBet}
                    onChange={(event) => props.handleCopyFirstBet(event)} />
                <span className='ms-2'><FormattedMessage id="label.copyFirstBet" defaultMessage="Copy first bet" /></span>
            </div>
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='app-table-form app-table-fttd'>
                <div className="d-none d-md-flex  app-theader">
                    <div className='w-100 d-flex justify-content-start py-2 app-trow'>
                        <div className='app-tcol'>#</div>
                        <div className='app-tcol'><FormattedMessage id="label.number" defaultMessage="Number (2-4 digits)" /></div>
                        <div className='app-tcol'><FormattedMessage id="label.betType" defaultMessage="Bet Type" /></div>
                        <div className='app-tcol'><FormattedMessage id="label.bet" defaultMessage="Bet" /></div>
                        <div className='app-tcol'><FormattedMessage id="label.discount" defaultMessage="Discount" /></div>
                        <div className='app-tcol'><FormattedMessage id="label.betAmount" defaultMessage="Amount" /></div>
                        <div className='app-tcol'></div>
                    </div>
                </div>
                <div className='d-flex flex-column app-tbody'>
                    {copyFirstBet()}
                    <FttdRow
                        rowsData={props.rowsData}
                        handleChange={props.handleChange}
                        handleValueChange={props.handleValueChange}
                        handleBlur={props.handleBlur}
                        handleOnCheck={props.handleOnCheck} />
                </div>
                <div className="d-flex justify-content-end app-tfooter p-2 pe-3">
                    <span><FormattedMessage id="label.totalBetAmount" defaultMessage="Amount" /></span>
                    <span className='mx-1'>:</span>
                    <span>
                        <span className='me-2'>IDR</span>
                        <NumberFormat
                            type="text"
                            displayType='text'
                            value={props.totalBetAmount}
                            thousandSeparator='.'
                            decimalSeparator=','
                            allowNegative={false}
                            decimalScale={2}
                            fixedDecimalScale={true} />
                    </span>
                </div>

                <div className="d-flex justify-content-end my-3">
                    {backButton()}
                    <button type="reset" className="glossy-button glossy-button-black me-1" onClick={props.handleReset}>
                        {RESET_ICON}
                        <span><FormattedMessage id="button.reset" defaultMessage="Reset" /></span>
                    </button>
                    <button type="reset" className="glossy-button glossy-button-black me-1" onClick={(event) => props.handleAddRow(event)}>
                        {ADD_ROW_ICON}
                        <span><FormattedMessage id="button.addRow" defaultMessage="Add Row" /></span>
                    </button>
                    <button type="button" className="glossy-button glossy-button-red" onClick={props.handleSubmit}>
                        {BET_ICON}
                        <span><FormattedMessage id="button.bet" defaultMessage="Bet" /></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FttdTable;