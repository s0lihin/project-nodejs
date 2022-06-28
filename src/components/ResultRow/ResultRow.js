import { FormattedMessage } from 'react-intl';
import { getWeekDay } from '../../utility/DateUtility';

function ResultRow({ rowsData }) {

    const getWinBetOn = (winBetOn) => {
        if (winBetOn) {
            const winBetOnArray = winBetOn.split('');

            return (
                winBetOnArray.map((num, index) => {
                    return <span key={index}>{num}</span>
                })
            )
        } else {
            return <span>x</span>
        }

    }

    if (rowsData.length === 0) {
        return (
            <div key='not-found' className='data-not-found'>
                <FormattedMessage id="message.dataNotFound" defaultMessage="Data is not found" />
            </div>
        )
    } else {
        return (
            rowsData.map((data, index) => {
                const { openingSession, winBetOn } = data;

                return (
                    <div key={index} className='d-flex flex-column d-md-inline-block app-trow'>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <span className='label'>#</span>
                            <span className='value'>{index + 1}</span>
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <span className='label'>
                                <FormattedMessage id="label.date" defaultMessage="Date" />
                            </span>
                            <span className='value'>{openingSession}</span>
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <span className='label'>
                                <FormattedMessage id="label.day" defaultMessage="Day" />
                            </span>
                            <span className='value'>{getWeekDay(openingSession)}</span>
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <span className='label'>
                                <FormattedMessage id="label.output" defaultMessage="Output" />
                            </span>
                            <span className='value'>
                                <div className='d-flex bet-on'>{getWinBetOn(winBetOn)}</div>
                            </span>
                        </div>
                    </div>
                )
            })

        )
    }
}

export default ResultRow;