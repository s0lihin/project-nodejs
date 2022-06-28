import { FormattedMessage, injectIntl } from 'react-intl';
import NumberFormat from 'react-number-format';
import { isValid } from '../../services/ValidationService';

function FttdSetRow(props) {
    return (

        props.rowsData.map((data, index) => {
            const { num1, num2, num3, num4, bet2D, bet3D, bet4D, betAll, checked, modified } = data;
            
            return (
                <div key={index} className='w-100 d-flex flex-column  flex-md-row justify-content-start app-trow'>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <span className='label'>#</span>
                            <span className='value'>{index + 1}</span>
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <div className='label'><FormattedMessage id="label.number" defaultMessage="Number (2-4 digits)" /></div>
                            <div className='d-flex'>
                                <input
                                    type="text"
                                    name={'num1' + index}
                                    maxLength="1"
                                    inputMode='decimal' 
                                    placeholder='X'
                                    pattern='\d*'
                                    value={num1}
                                    onChange={(event) => (props.handleChange(event, index))}
                                    onBlur={() => (props.handleBlur(index))}
                                    className="form-control one-digit"/>
                                <input
                                    type="text"
                                    name={'num2' + index}
                                    maxLength="1"
                                    inputMode='decimal'
                                    placeholder='X' 
                                    pattern='\d*'
                                    value={num2}
                                    onChange={(event) => (props.handleChange(event, index))}
                                    onBlur={() => (props.handleBlur(index))}
                                    className="form-control one-digit" />
                                <input
                                    type="text"
                                    name={'num3' + index}
                                    maxLength="1"
                                    inputMode='decimal' 
                                    placeholder='X'
                                    pattern='\d*'
                                    value={num3}
                                    onChange={(event) => (props.handleChange(event, index))}
                                    onBlur={() => (props.handleBlur(index))}
                                    className="form-control one-digit" />
                                <input
                                    type="text"
                                    name={'num4' + index}
                                    maxLength="1"
                                    inputMode='decimal' 
                                    placeholder='X'
                                    pattern='\d*'
                                    value={num4}
                                    onChange={(event) => (props.handleChange(event, index))}
                                    onBlur={() => (props.handleBlur(index))}
                                    className="form-control one-digit" />
                            </div>
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <div className='label'><FormattedMessage id="label.bet" defaultMessage="Bet" /> 2D</div>
                            <NumberFormat
                                    type="text"
                                    maxLength="10"
                                    inputMode='decimal' 
                                    pattern='\d*'
                                    name={"bet2D" + index}
                                    value={bet2D}
                                    placeholder='2D'
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    fixedDecimalScale={false}
                                    allowNegative={false}
                                    onValueChange={(values) => (props.handleValueChange(index, values, 'bet2D'))}
                                    onBlur={(event) => (props.handleBlur(index))}
                                    className="form-control" />
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <div className='label'><FormattedMessage id="label.bet" defaultMessage="Bet" /> 3D</div>
                            <NumberFormat
                                    type="text"
                                    maxLength="9"
                                    inputMode='decimal' 
                                    pattern='\d*'
                                    name="bet3D"
                                    value={bet3D}
                                    placeholder='3D'
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    fixedDecimalScale={false}
                                    allowNegative={false}
                                    onValueChange={(values) => (props.handleValueChange(index, values, 'bet3D'))}
                                    onBlur={(event) => (props.handleBlur(index))}
                                    className="form-control" />
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <div className='label'><FormattedMessage id="label.bet" defaultMessage="Bet" /> 4D</div>
                            <NumberFormat
                                    type="text"
                                    maxLength="7"
                                    inputMode='decimal' 
                                    pattern='\d*'
                                    name="bet4D"
                                    value={bet4D}
                                    placeholder='4D'
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    fixedDecimalScale={false}
                                    allowNegative={false}
                                    onValueChange={(values) => (props.handleValueChange(index, values, 'bet4D'))}
                                    onBlur={(event) => (props.handleBlur(index))}
                                    className="form-control" />
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <div className='label'>
                                <FormattedMessage id="label.bet" defaultMessage="Bet" /> <FormattedMessage id="label.all" defaultMessage="All" />
                            </div>
                            <NumberFormat
                                type="text"
                                maxLength="7"
                                inputMode='decimal' 
                                pattern='\d*'
                                name="betAll"
                                value={betAll}
                                placeholder='2D,3D,4D'
                                thousandSeparator='.'
                                decimalSeparator=','
                                fixedDecimalScale={false}
                                allowNegative={false}
                                onValueChange={(values) => (props.handleValueChange(index, values, 'betAll'))}
                                onBlur={() => (props.handleBlur(index))}
                                className="form-control" />
                        </div>
                        <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                            <div className='label'></div>
                            {isValid(modified, checked)}
                        </div>
                </div>
            )
        })

    )
}

export default injectIntl(FttdSetRow);