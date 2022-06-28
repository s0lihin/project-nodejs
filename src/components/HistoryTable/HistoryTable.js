import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import DetailModal from '../DetailModal/DetailModal';
import HistoryRow from '../HistoryRow/HistoryRow';
import './HistoryTable.scss';

function HistoryTable({ rowsData, offset, error }) {

    const [data, setData] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleDetail = (dt) => {
        setData(dt);
        setShow(true);
    }

    return (
        <>
        <DetailModal show={show} handleClose={handleClose} data={data} />
        <div className='app-table-data app-table-history'>
            <div className="d-none d-md-flex app-theader">
                <div className='d-flex py-2 app-trow'>
                    <div className='app-tcol'>#</div>
                    <div className='app-tcol'>
                        <FormattedMessage id="label.provider" defaultMessage="Provider" />
                    </div>
                    <div className='app-tcol'>
                        <FormattedMessage id="label.bet" defaultMessage="Bet" />
                    </div>
                    <div className='app-tcol'>
                        <FormattedMessage id="label.betAmount" defaultMessage="Amount" />
                    </div>
                    <div className='app-tcol'>
                        <FormattedMessage id="label.shift" defaultMessage="Shift" />
                    </div>
                    <div className='app-tcol'>
                        <FormattedMessage id="label.date" defaultMessage="Date" />
                    </div>
                    <div className='app-tcol'>
                        <FormattedMessage id="label.wl" defaultMessage="Wl" />
                    </div>
                    <div className='app-tcol'></div>
                </div>
            </div>
            <div className='d-flex flex-column app-tbody'>
                <HistoryRow rowsData={rowsData} offset={offset} error={error} handleDetail={handleDetail} />
            </div>
        </div>
        </>
    )
}

export default HistoryTable;