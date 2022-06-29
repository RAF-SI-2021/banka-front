import React, { useEffect, useState } from "react";
import Select from "./common/Select";
import PropTypes from "prop-types";
import { getCompanies } from "../clients/companyClient";

function CompanyDropdown(props) {
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        getCompanies().then(setCompanies)
    }, [])

    function createOptions() {
        const options = []
        companies.map(c => {
            options.push(c['naziv'])
        })
        return options
    }

    function handleSelect(e) {
        const found = companies.find(c => {
            return c['naziv'] === e
        })
        props.onSelect(found)
    }

    return (
        <Select
            className={props.className}
            options={createOptions()}
            label="Kompanija"
            onChange={handleSelect}
            defValue={props.selected}/>
    )
}

CompanyDropdown.propTypes = {
    selected: PropTypes.string,
    onSelect: PropTypes.func,
    className: PropTypes.string,
}

export default CompanyDropdown;