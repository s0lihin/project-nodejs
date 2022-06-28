import { FormattedMessage } from 'react-intl';
import FttdSetRow from '../FttdSetRow/FttdSetRow';
import { RESET_ICON, VIEW_VARIATIONS_ICON } from '../Icons/Icons';
import './FttdSetTable.scss';

function FttdSetTable({ rowsDataSet, handleChange, handleValueChange, handleBlur, handleSubmit, handleReset  }) {

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='app-table-form app-table-fttdset'>
                <div className="d-none d-md-flex app-theader">
                    <div className='w-100 d-flex justify-content-start py-2 app-trow'>
                        <div className='app-tcol'>#</div>
                        <div className='app-tcol'><FormattedMessage id="label.number" defaultMessage="Number (2-4 digits)" /></div>
                        <div className='app-tcol'><FormattedMessage id="label.bet" defaultMessage="Bet" /> 2D</div>
                        <div className='app-tcol'><FormattedMessage id="label.bet" defaultMessage="Bet" /> 3D</div>
                        <div className='app-tcol'><FormattedMessage id="label.bet" defaultMessage="Bet" /> 4D</div>
                        <div className='app-tcol'><FormattedMessage id="label.bet" defaultMessage="Bet" /> <FormattedMessage id="label.all" defaultMessage="All" /></div>
                        <div className='app-tcol'></div>
                    </div>
                </div>
                <div className='d-flex flex-column app-tbody'>
                    <FttdSetRow 
                        rowsData={rowsDataSet} 
                        handleChange={handleChange} 
                        handleValueChange={handleValueChange}
                        handleBlur={handleBlur} />
                </div>
                <div className="d-flex justify-content-end mt-3 mb-3">
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
        </div>
    )
}

export default FttdSetTable;