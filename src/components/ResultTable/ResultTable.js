import { FormattedMessage } from 'react-intl';
import ResultRow from '../ResultRow/ResultRow';
import './ResultTable.scss';

function ResultTable({ rowsData }) {

    return (
        <div className='app-table-data app-table-result'>
            <div className="d-none d-md-flex app-theader">
                <div className='d-flex py-2 app-trow'>
                    <div className='app-tcol'>#</div>
                    <div className='app-tcol'>
                        <FormattedMessage id="label.date" defaultMessage="Date" />
                    </div>
                    <div className='app-tcol'>
                        <FormattedMessage id="label.day" defaultMessage="Day" />
                    </div>
                    <div className='app-tcol'>
                        <FormattedMessage id="label.output" defaultMessage="Output" />
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column app-tbody'>
                <ResultRow rowsData={rowsData} />
            </div>
        </div>
    )
}

export default ResultTable;