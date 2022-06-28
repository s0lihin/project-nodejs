import { Dropdown, DropdownButton } from "react-bootstrap";

function ShiftSelect({ shifts, shift, handleSelectShift }) {

    const title = shift && shift.length > 0 ? shift[0] : '';
    const dropdownItem = shifts.map((sh) => {
        return <Dropdown.Item
            key={sh[0]}
            eventKey={sh[0]}>
            <span className="fw-bold me-2">{sh[0]}</span> <span className="badge bg-secondary">{sh[2]}</span>
        </Dropdown.Item>
    });

    return (
        <>
        <DropdownButton disabled={shifts.length === 0} variant="secondary" align="end" title={title} onSelect={handleSelectShift} id="shift">
            {dropdownItem}
        </DropdownButton>
        </>
    );
}

export default ShiftSelect;