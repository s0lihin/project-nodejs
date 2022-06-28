import { nagaRules } from "../../services/RuleService";
import { FormattedMessage } from 'react-intl';
import { formatNumber } from "../../services/NumberService";

function NagaDescription() {

    const rules = nagaRules();

    const discountRules = rules.discount.map(data => {
        return Object.keys(data).map(key => {
            return `${key} = ${data[key]}`
        });
    }).join(" | ");

    const priceRules = rules.price.map(data => {
        return Object.keys(data).map(key => {
            return `${key} = ${data[key]}`
        });
    }).join(" | ");

    const minBetRules = rules.minBet.map(data => {
        return Object.keys(data).map(key => {
            return `${key} = ${formatNumber(data[key])}`
        });
    }).join(" | ");

    const maxBetRules = rules.maxBet.map(data => {
        return Object.keys(data).map(key => {
            return `${key} = ${formatNumber(data[key])}`
        });
    }).join(" | ");

    return (
        <div className='d-md-flex justify-content-center align-items-center'>
            <div className="rule">
                <table className='table table-borderless table-sm mb-0'>
                    <thead>
                        <tr>
                            <th colSpan='3' className="title"><FormattedMessage id="label.rule" defaultMessage="Rule" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th style={{ width: 120 }}><FormattedMessage id="label.description" defaultMessage="Descripton" /></th>
                            <td><FormattedMessage id={rules.description} defaultMessage="Descripton" /></td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.discount" defaultMessage="Discount" /></th>
                            <td>{discountRules}</td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.price" defaultMessage="Price" /></th>
                            <td>{priceRules}</td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.minBet" defaultMessage="Min. Bet" /></th>
                            <td>{minBetRules}</td>
                        </tr>
                        <tr>
                            <th><FormattedMessage id="label.maxBet" defaultMessage="Max. Bet" /></th>
                            <td>{maxBetRules}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default NagaDescription;