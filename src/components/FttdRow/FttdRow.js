import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import Form from 'react-bootstrap/Form';


function FttdRow({ rowsData, handleChange, handleBlur, handleValueChange, handleOnCheck }) {

    return (

        rowsData.map((data, index) => {
            const { num1, num2, num3, num4, betTypeName, betAmountOri, discount, betAmount, checked } = data;

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
                                pattern='\d*'
                                placeholder='X'
                                value={num1}
                                onBlur={(event) => handleBlur(index, event)}
                                onChange={(event) => (handleChange(index, event))}
                                className="form-control one-digit" />
                            <input
                                type="text"
                                name={'num2' + index}
                                maxLength="1"
                                inputMode='decimal'
                                pattern='\d*'
                                placeholder='X'
                                value={num2}
                                onBlur={(event) => handleBlur(index, event)}
                                onChange={(event) => (handleChange(index, event))}
                                className="form-control one-digit" />
                            <input
                                type="text"
                                name={'num3' + index}
                                maxLength="1"
                                inputMode='decimal'
                                pattern='\d*'
                                placeholder='X'
                                value={num3}
                                onBlur={(event) => handleBlur(index, event)}
                                onChange={(event) => (handleChange(index, event))}
                                className="form-control one-digit" />
                            <input
                                type="text"
                                name={'num4' + index}
                                maxLength="1"
                                inputMode='decimal'
                                pattern='\d*'
                                placeholder='X'
                                value={num4}
                                onBlur={(event) => handleBlur(index, event)}
                                onChange={(event) => (handleChange(index, event))}
                                className="form-control one-digit" />
                        </div>
                    </div>
                    <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                        <div className='label'><FormattedMessage id="label.betType" defaultMessage="Bet Type" /></div>
                        <div className='form-control readonly'>
                            <span className='d-inline-block'>{betTypeName}</span>
                        </div>
                    </div>

                    <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                        <div className='label'><FormattedMessage id="label.bet" defaultMessage="Bet" /></div>
                        <NumberFormat
                            type="text"
                            maxLength="10"
                            inputMode='decimal'
                            pattern='\d*'
                            placeholder='0'
                            name={"betAmountOri" + index}
                            value={betAmountOri}
                            thousandSeparator='.'
                            decimalSeparator=','
                            fixedDecimalScale={false}
                            allowNegative={false}
                            onBlur={(event) => handleBlur(index, event)}
                            onValueChange={(values) => (handleValueChange(index, values, 'betAmountOri'))}
                            className="form-control" />
                    </div>
                    <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                        <div className='label'><FormattedMessage id="label.discount" defaultMessage="Discount" /></div>
                        <div className='form-control readonly'>
                            <span className='d-inline-block'>{discount ? discount + ' %' : ''}</span>
                        </div>
                    </div>
                    <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                        <div className='label'><FormattedMessage id="label.betAmount" defaultMessage="Amount" /></div>
                        <div className='form-control readonly'>
                            <NumberFormat
                                type="text"
                                displayType='text'
                                value={betAmount}
                                thousandSeparator='.'
                                decimalSeparator=','
                                allowNegative={false}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                className="d-inline-block" />
                        </div>
                    </div>
                    <div className='d-flex d-md-inline-block align-items-center app-tcol'>
                        <div className='label'></div>
                        <Form.Check
                            className='app-check-input'
                            checked={checked}
                            onChange={(event) => handleOnCheck(index, event)} />
                    </div>
                </div>
            )
        })

    )
}

export default FttdRow;