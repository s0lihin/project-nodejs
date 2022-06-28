import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import PinggiranRow from '../PinggiranRow/PinggiranRow';
import { BET_ICON, RESET_ICON } from '../Icons/Icons';
import './PinggiranTable.scss';

function PinggiranTable({ rowsData, handleValueChange, totalBetAmount, handleSubmit, handleReset, handleBlur }) {

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='app-table-form app-table-pinggiran'>
                <div className="d-none d-md-flex app-theader">
                    <div className='d-flex py-2 app-trow'>
                        <div className='app-tcol'>#</div>
                        <div className='app-tcol'><FormattedMessage id="menu.game" defaultMessage="Number" /></div>
                        <div className='app-tcol'><FormattedMessage id="label.bet" defaultMessage="Bet" /></div>
                        <div className='app-tcol'><FormattedMessage id="label.discount" defaultMessage="Discount" /></div>
                        <div className='app-tcol'><FormattedMessage id="label.betAmount" defaultMessage="Amount" /></div>
                        <div className='app-tcol'></div>
                    </div>
                </div>
                <div className='d-flex flex-column app-tbody'>
                    <PinggiranRow
                        rowsData={rowsData}
                        handleValueChange={handleValueChange}
                        handleBlur={handleBlur} />
                </div>
                <div className="d-flex justify-content-end app-tfooter p-2 pe-3">
                    <span><FormattedMessage id="label.totalBetAmount" defaultMessage="Amount" /></span>
                    <span className='mx-1'>:</span>
                    <span>
                        <span className='me-2'>IDR</span>
                        <NumberFormat
                            type="text"
                            displayType='text'
                            value={totalBetAmount}
                            thousandSeparator='.'
                            decimalSeparator=','
                            allowNegative={false}
                            decimalScale={2}
                            fixedDecimalScale={true} />
                    </span>
                </div>

                <div className="d-flex justify-content-end my-3">
                    <button type="reset" className="glossy-button glossy-button-black me-1" onClick={handleReset}>
                        {RESET_ICON}
                        <span><FormattedMessage id="button.reset" defaultMessage="Reset" /></span>
                    </button>
                    <button type="button" className="glossy-button glossy-button-red" onClick={handleSubmit}>
                        {BET_ICON}
                        <span><FormattedMessage id="button.bet" defaultMessage="Bet" /></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PinggiranTable;