import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getAllStocks } from "../clients/stocks";
import Autocomplete from "./common/Autocomplete";
import Select from "./common/Select";

function StocksDropdown(props) {
    const [stocks, setStocks] = useState([])

    useEffect(() => {
        getAllStocks().then(setStocks)
    }, [])

    function createOptions() {
        const options = []
        stocks.map(c => {
            options.push(c['oznakaHartije'])
        })
        return options
    }

    function handleSelect(e) {
        const found = stocks.find(c => {
            return c['oznakaHartije'] === e
        })
        props.onSelect(found)
    }

    // This method will only return string while handleSelect will return full object
    function handleAutocomplete(e) {
        props.onSelect(e)
    }

    return (
        <>
            {props.allowCustom && <Autocomplete label="Akcija" items={createOptions()} onChange={handleAutocomplete}/>}
            {!props.allowCustom &&
                <Select
                    className={props.className}
                    options={createOptions()}
                    label="Akcija"
                    onChange={handleSelect}
                    defValue={props.selected}
                    required={props.requried}
                />}
        </>
    )
}

StocksDropdown.propTypes = {
    selected: PropTypes.string,
    allowCustom: PropTypes.bool,
    requried: PropTypes.bool,
    onSelect: PropTypes.func,
    className: PropTypes.string,
}

export default StocksDropdown