import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "../common/Modal";
import { getMarginTransactions } from "../../clients/marginClient";
import Table from "../common/Table";

function MarginTransactionModal(props) {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        getMarginTransactions().then(setTransactions)
    }

    function renderRows() {
        const rows = []
        transactions.map(t => [
            rows.push([
                t['id'],
                t['iznos'].toFixed(2),
                t['racun']['brojRacuna'],
                new Date(t['datumVreme']).toDateString(),
            ])
        ])
        return rows
    }

    return (
        <Modal className="min-w-[1100px]" id="view-margin-modal" title="Uplata" onClose={props.onClose}>
            <Table headings={['ID', 'Iznos', 'Datum']} rows={renderRows()} pagination/>
        </Modal>
    )
}

MarginTransactionModal.propTypes = {
    onClose: PropTypes.func,
}

export default MarginTransactionModal