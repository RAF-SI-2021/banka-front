import React, { useEffect, useState } from "react";
import Block from "../common/Block";
import { getMarginState } from "../../clients/marginClient";
import Table from "../common/Table";
import Button from "../common/Button";
import MarginAddTransactionModal from "./MarginAddTransactionModal";
import MarginTransactionModal from "./MarginTransactionModal";

function MarginStateBlock() {
    const [marginState, setMarginState] = useState([])
    const [createTransactionModal, setCreateTransactionModal] = useState(false)
    const [viewTransactionsModal, setViewTransactionsModal] = useState(false)

    console.log(marginState)

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        getMarginState().then(setMarginState)
    }

    function createRows() {
        const rows = []
        marginState.map(m => {
            rows.push([
                m['kodValute'],
                m['ukupno'],
                m['raspolozivo']
            ])
        })
        return rows
    }

    function renderCta() {
        return (
            <Button label="Uplata" onClick={() => setCreateTransactionModal(true)} design="secondary"/>
        )
    }

    return (
        <Block title="Marzni nalog" cta={renderCta()}>
            <Table
                headings={['Valuta', 'Ukupno', 'Raspolozivo']}
                rows={createRows()}
                onClick={() => setViewTransactionsModal(true)}
                clickable
            />
            {createTransactionModal &&
                <MarginAddTransactionModal onClose={() => setCreateTransactionModal(false)} onSuccess={fetchData}/>}
            {viewTransactionsModal &&
                <MarginTransactionModal onClose={() => setViewTransactionsModal(false)}/>}
        </Block>
    )
}

export default MarginStateBlock