import React, {useEffect, useState} from "react"
import {useSelector} from "react-redux";
import {
    getAccountCacheStateAgent,
    getAccountCashStateSupervisor,
    getAccountTransactions
} from "../clients/accountClient";
import Table from "./common/Table"
import Modal from "./common/Modal"
import {isAgent, isSupervisor} from "../utils";
import moment from "moment";
import numeral from "numeral"
import Stats from "./common/Stats";

function CashAccountsTable() {
    const user = useSelector(state => state.app.user);
    const [cashAccount, setCashAccount] = useState([]);
    const [agentLimits, setAgentLimits] = useState(null);
    const [selected, setSelected] = useState(null);
    const [transactions, setTransactions] = useState([]);

    async function fetchCashAccountData() {
        if (isSupervisor(user)) {
            setCashAccount(await getAccountCashStateSupervisor())
        }
        if (isAgent(user)) {
            setAgentLimits(await getAccountCacheStateAgent())
        }
    }

    async function fetchTransactions() {
        const t = await getAccountTransactions(selected[0])
        console.log("transactions", t)
        setTransactions(t)
    }

    function formatNumber(num) {
        return numeral(num).format("0.[000]")
    }

    function cashAccountToTableRow() {
        let tableRows = [];
        cashAccount.map(item => {
            tableRows.push([
                item['kodValute'],
                formatNumber(item['ukupno']),
                formatNumber(item['rezervisano']),
                formatNumber(item['raspolozivo']),
            ])
        })
        return tableRows;
    }

    function renderModalContent() {
        function transactionsToTableRow() {
            let tableRows = []
            transactions.map(item => {
                tableRows.push(
                    [
                        moment(item['datumVreme']).format("DD.MM.YYYY HH:mm"),
                        item['username'],
                        item['opis'],
                        item['valuta']['kodValute'],
                        formatNumber(item['uplata']),
                        formatNumber(item['isplata']),
                        formatNumber(item['rezervisano']),
                        formatNumber(item['rezervisanoKoristi']),
                    ]
                )
            })
            return tableRows
        }

        return (
            <div>
                <Table
                    headings={["Datum", "Korisnik", "Opis", "Valuta", "Uplata", "Isplata", "Rezervisano", "Koristi"]}
                    rows={transactionsToTableRow()} pagination paginationGroupSize={10}/>
            </div>
        )
    }

    function renderAgent() {
        function prepareStats() {
            const list = []
            if (!agentLimits) return list

            for (const [key, value] of Object.entries(agentLimits)) {
                console.log(`${key}: ${value}`);
                list.push({text: key, stat: value})
            }
            return list
        }

        return (
            <>
                <hr className="mb-5"/>
                <Stats stats={prepareStats()}/>
            </>
        )
    }

    function handleCloseModal() {
        setSelected(null)
        setTransactions([])
    }

    useEffect(() => {
        if (!user) return;
        fetchCashAccountData()
    }, [user])

    useEffect(() => {
        if (!selected) return;
        fetchTransactions();
    }, [selected])

    return (
        <>
            {isSupervisor(user) &&
                <Table headings={['Valuta', 'Ukupno', 'Rezervisano', 'Raspolozivo']} rows={cashAccountToTableRow()}
                       clickable onClick={setSelected}/>}
            {isAgent(user) && renderAgent()}
            {!!selected &&
                <Modal visible title={`Transakcije ${selected[0]}`} onClose={handleCloseModal}
                       className="min-w-[1000px]">
                    {renderModalContent()}
                </Modal>
            }
        </>
    )
}

export default CashAccountsTable