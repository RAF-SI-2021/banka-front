import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "../common/Modal";
import { getMarginCapitalForType } from "../../clients/marginClient";
import Table from "../common/Table";

function MarginKapitalModal(props) {
    const [items, setItems] = useState([])
    console.log(items)

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        getMarginCapitalForType(props.type).then(setItems)
    }

    function createRows() {
        const rows = []
        items.map(i => rows.push([
            i['id'],
            i['berza'],
            i['kodValute'],
            i['oznakaHartije'],
            i['kupljenoZa'],
            i['vrednost'],
            i['profit'],
        ]))
        return rows
    }

    return (
        <Modal className="min-w-[1100px]" id="margin-modal" title="Margine" onClose={props.onClose}>
            <Table headings={['ID', 'Berza', 'Valuta', 'Oznaka', 'Kupljeno za', 'Vrednost', 'Profit']}
                   rows={createRows()} pagination/>
        </Modal>
    )
}

MarginKapitalModal.propTypes = {
    type: PropTypes.string,
    onClose: PropTypes.func,
}

export default MarginKapitalModal