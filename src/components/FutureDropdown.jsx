import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Select from "./common/Select";
import { getAllFutures } from "../clients/stocks";

function FutureDropdown(props) {
    const [futures, setFutures] = useState([])

    useEffect(() => {
        getAllFutures().then(setFutures)
    }, [])

    function createOptions() {
        const options = []
        futures.map(c => {
            options.push(c['oznakaHartije'])
        })
        return options
    }

    function handleSelect(e) {
        const found = futures.find(c => {
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
            defValue={props.selected}
            required={props.required}
        />
    )
}


Storage.propTypes = {
    selected: PropTypes.string,
    requried: PropTypes.bool,
    onSelect: PropTypes.func,
    className: PropTypes.string,
}
export default FutureDropdown