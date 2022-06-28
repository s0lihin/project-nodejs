import { Dropdown, DropdownButton } from "react-bootstrap";
import { getProviders } from "../../services/CommonService";

function ProviderDropdown({ provider, handleSelectProvider }) {

    const dropdownItem = getProviders().map((provider) => {
            return <Dropdown.Item
            key={provider.providerName}
            eventKey={provider.providerName}>
            {provider.label}
        </Dropdown.Item>
        
    });

    return (
        <DropdownButton variant="secondary" align="end" title={provider.label ? provider.label : ''} onSelect={handleSelectProvider} id="provider-name">
            {dropdownItem}
        </DropdownButton>
    );
}

export default ProviderDropdown;