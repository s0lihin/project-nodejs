import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
import NumberFormat from 'react-number-format';
import { splitProviderName } from '../../services/CommonService';
import { datetimeToString, } from '../../utility/DateUtility';

function HistoryRow(props) {

    const getBetOn = (betOn) => {
        if (betOn) {
            const betOnArray = betOn.split('');

            return (
                betOnArray.map((num, index) => {
                    return <span key={index}>{num}</span>
                })
            )
        } else {
            return <span>x</span>
        }
    }

    return (
        props.rowsData.map((data, index) => {
            if (data.openingSession) {
                const { providerName, betOn, betAmount, shift, createDateTime, wl } = data;

                return (
                    <div key={index} className='d-flex flex-column d-md-inline-block app-trow'>

                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <span className='label'>#</span>
                            <span className='value'>{props.offset + index + 1}</span>
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <span className='label'>
                                <FormattedMessage id="label.provider" defaultMessage="Provider" />
                            </span>
                            <span className='value'>{splitProviderName(providerName)}</span>
                        </div>

                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <span className='label'>
                                <FormattedMessage id="label.bet" defaultMessage="Bet" />
                            </span>
                            <span className='value'>
                                <div className='d-flex bet-on'>{getBetOn(betOn)}</div>
                            </span>
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <span className='label'>
                                <FormattedMessage id="label.betAmount" defaultMessage="Amount" />
                            </span>
                            <NumberFormat
                                type="text"
                                displayType='text'
                                value={betAmount}
                                thousandSeparator='.'
                                decimalSeparator=','
                                allowNegative={false}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                className="value" />
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <span className='label'>
                                <FormattedMessage id="label.shift" defaultMessage="Shift" />
                            </span>
                            <span className='value'>{shift}</span>
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <span className='label'>
                                <FormattedMessage id="label.date" defaultMessage="Date" />
                            </span>
                            <span className='value'>{datetimeToString(createDateTime)}</span>
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <span className='label'>
                                <FormattedMessage id="label.wl" defaultMessage="wl" />
                            </span>
                            <span className='value'>{wl ? props.intl.formatMessage({ id: [wl] }) : '-'}</span>
                        </div>
                        <div className='d-flex d-md-inline-block justify-content-center align-items-center app-tcol link-detail'>
                            <span onClick={() => props.handleDetail(data)}>
                                <FormattedMessage id="button.detail" defaultMessage="Detail" />
                            </span>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div key='not-found' className='data-not-found'>
                        <FormattedMessage id="message.dataNotFound" defaultMessage="Data is not found" />
                    </div>
                )
            }
        })

    )
}

export default injectIntl(HistoryRow);