import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getAllStocks } from "../clients/stocks";
import Autocomplete from "./common/Autocomplete";

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
        props.onSelect(e)
    }

    return (
        <Autocomplete label="Akcija" items={createOptions()} onChange={handleSelect} className={props.className}/>
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