import PropTypes from "prop-types";
import Table from "./common/Table";
import React from "react";
import { useNavigate } from "react-router-dom";
import { URLS } from "../routes";

function AgreementsTable(props) {
    const navigate = useNavigate();

    function createTableRows() {
        const rows = []
        props.agreements.map(c => {
            rows.push([
                c['id'],
                c['delovodniBroj'],
                c['status'],
                new Date(c['created']).toLocaleString(),
                new Date(c['lastChanged']).toLocaleString(),
            ])
        })
        return rows
    }

    function handleClick(e) {
        navigate(`/${URLS.DASHBOARD.AGREEMENT.LIST}/${e[0]}`)
    }

    return (
        <Table
            headings={['ID', 'Delovodni broj', 'Status', 'Kreiran', 'Izmenjen']}
            rows={createTableRows()}
            clickable
            onClick={handleClick}
        />
    )
}

AgreementsTable.propTypes = {
    agreements: PropTypes.array,
}

export default AgreementsTable