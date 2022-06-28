import { Button, Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import './ConfirmationModal.scss';

function ConfirmationModal({ showModal, handleCloseModal, handleOkModal, message }) {
    return (
        <Modal show={showModal} onHide={handleCloseModal} size="sm" className='modal-confirmation'>
            <Modal.Header className='p-2' closeButton>
                <Modal.Title className='fs-7'>
                    <FormattedMessage id="label.confirmation" defaultMessage="Confirmation" />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >{message}</Modal.Body>
            <Modal.Footer>
                <Button className='modal-button' size="sm" variant="dark" onClick={handleCloseModal}>
                    <FormattedMessage id="button.cancel" defaultMessage="Cancel" />
                </Button>
                <Button className='modal-button' size="sm" variant="danger" onClick={handleOkModal}>
                    <FormattedMessage id="button.ok" defaultMessage="OK" />
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal;