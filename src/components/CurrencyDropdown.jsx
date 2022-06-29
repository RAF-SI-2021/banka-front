import Select from "./common/Select";
import { useEffect, useState } from "react";
import { getCurrencies } from "../clients/accountClient";
import PropTypes from "prop-types";

function CurrencyDropdown(props) {
    const [currencies, setCurrencies] = useState([])

    useEffect(() => {
        getCurrencies().then(setCurrencies)
    }, [])

    function createOptions() {
        const options = []
        currencies.map(c => {
            options.push(c['kodValute'])
        })
        return options
    }

    function handleSelect(e) {
        const found = currencies.find(c => {
            return c['kodValute'] === e
        })
        props.onSelect(found)
    }

    return (
        <Select className={props.className} options={createOptions()} label="Valuta" onChange={handleSelect}
                defValue={props.selected}/>
    )
}

CurrencyDropdown.propTypes = {
    selected: PropTypes.string,
    onSelect: PropTypes.func,
    className: PropTypes.string,
}

export default CurrencyDropdown