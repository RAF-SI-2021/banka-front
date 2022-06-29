import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Select from "./common/Select";
import { getAllStocks } from "../clients/stocks";

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

    return (
        <Select
            className={props.className}
            options={createOptions()}
            label="Akcija"
            onChange={handleSelect}
            defValue={props.selected}/>
    )
}


Storage.propTypes = {
    selected: PropTypes.string,
    onSelect: PropTypes.func,
    className: PropTypes.string,
}
export default StocksDropdown