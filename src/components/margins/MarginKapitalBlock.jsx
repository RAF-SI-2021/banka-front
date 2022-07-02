import React, { useEffect, useState } from "react";
import Block from "../common/Block";
import { getMarginCapital } from "../../clients/marginClient";
import Table from "../common/Table";
import MarginKapitalModal from "./MarginKapitalModal";
import numeral from "numeral"

function MarginKapitalBlock() {
    const [marginState, setMarginState] = useState([])
    const [modal, setModal] = useState(false)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        getMarginCapital().then(setMarginState)
    }

    function toCurrency(number) {
        return numeral(number).format("$0,0.00")
    }

    function createRows() {
        const rows = []
        marginState.map(m => {
            rows.push([
                m['kapitalType'],
                toCurrency(m['ukupno'])
            ])
        })
        return rows
    }

    function handleOnSelect(e) {
        setSelected(e[0])
        setModal(true)
    }

    function handleCloseModal() {
        setModal(false)
        setSelected(null)
    }

    return (
        <Block title="Pregled kapitala">
            <Table
                headings={['Tip kapitala', 'Ukupno']}
                rows={createRows()}
                onClick={handleOnSelect}
                clickable
            />
            {modal && <MarginKapitalModal onClose={handleCloseModal} type={selected}/>}
        </Block>
    )
}

export default MarginKapitalBlock