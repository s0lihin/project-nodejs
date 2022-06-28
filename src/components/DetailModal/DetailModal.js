import { Button, Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { datetimeToString } from '../../utility/DateUtility';
import './DetailModal.scss';

function DetailModal({ show, handleClose, data }) {

    const splitName = (name) => {
        if (name) {
            name = capitalize(name);
            return name.replace("Pools", " Pools");
        }
    }

    const capitalize = (s) => {
        return s && s[0].toUpperCase() + s.slice(1);
    }

    return (
        <Modal show={show} fullscreen='sm-down' onHide={handleClose} className="modal-detail">
            <Modal.Header className='p-2' closeButton>
                <Modal.Title>
                    <FormattedMessage id="button.detail" defaultMessage="Detail" />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <table className='table'>
                    <tbody>
                        <tr>
                            <th><FormattedMessage id="label.provider" defaultMessage="Provider" /></th>
                            <td>{splitName(data.providerName)}</td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.betType" defaultMessage="Bet Type" /></th>
                            <td>{data.betType}</td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.shift" defaultMessage="Shift" /></th>
                            <td>{data.shift}</td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.openingSession" defaultMessage="Opening Session" /></th>
                            <td>{data.openingSession}</td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.bet" defaultMessage="Bet" /></th>
                            <td>{data.betOn ? data.betOn : 'x'}</td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.betAmount" defaultMessage="Bet Amount" /></th>
                            <td>
                            <NumberFormat
                                type="text"
                                displayType='text'
                                value={data.betAmount}
                                thousandSeparator='.'
                                decimalSeparator=','
                                allowNegative={false}
                                decimalScale={2}
                                fixedDecimalScale={true} />
                            </td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.netAmount" defaultMessage="Net Amount" /></th>
                            <td>
                            <NumberFormat
                                type="text"
                                displayType='text'
                                value={data.netAmount}
                                thousandSeparator='.'
                                decimalSeparator=','
                                allowNegative={false}
                                decimalScale={2}
                                fixedDecimalScale={true} />
                            </td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.discount" defaultMessage="Discount" /></th>
                            <td>{data.discount} %</td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.multiplier" defaultMessage="Multiplier" /></th>
                            <td>{data.multiplier}</td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.status" defaultMessage="Status" /></th>
                            <td>{data.status}</td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.date" defaultMessage="Date" /></th>
                            <td>{datetimeToString(data.createDateTime)}</td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.wl" defaultMessage="Wl" /></th>
                            <td>{data.wl ? data.wl : '-'}</td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button className='modal-button' size="sm" variant="dark" onClick={handleClose}>
                    <FormattedMessage id="button.close" defaultMessage="Close" />
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailModal;