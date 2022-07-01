import React from "react"
import Table from "../../components/common/Table"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { securityCapitalListing } from "../../clients/capital";
import { useState } from "react";
import Block from "../../components/common/Block";
import Button from "../../components/common/Button";
import CashAccountsTable from "../../components/CashAccountsTable";
import Payment from "../../components/Payment";
import Modal from "../../components/common/Modal";
import MarginKapitalBlock from "../../components/margins/MarginKapitalBlock";
import MarginStateBlock from "../../components/margins/MarginStateBlock";
import Tab from "../../components/common/Tab";

export default function CapitalPage() {
    const [table, setTable] = useState([]);
    const [paymentModal, setPaymentModal] = useState(false)
    const [selectedTab, setSelectedTab] = useState("Kes nalog")

    const navigate = useNavigate();

    async function getCapitals() {
        const list = await securityCapitalListing();
        let tmp = [];
        list.map((r) => {
            tmp.push(createCapitalRow(r));
        });
        setTable(tmp);
    }

    function createCapitalRow(r) {
        return [
            r["kapitalType"],
            Number.parseFloat(r["ukupno"]).toFixed(2)
        ];
    }

    const routeChange = (e) => {
        navigate(e);
    }

    useEffect(() => {
        getCapitals();
    }, []);

    function renderCash() {
        return (
            <>
                <Block title="Keš nalog"
                       cta={<Button design="secondary" label="Uplata" onClick={() => setPaymentModal(true)}/>}>
                    <CashAccountsTable/>
                    {paymentModal &&
                        <Modal visible={true} onClose={() => setPaymentModal(false)} id="payment-modal" title="Uplata">
                            <Payment onDone={() => setPaymentModal(false)}/>
                        </Modal>}
                </Block>
                <Block className="flex flex-col gap-4" title="Pregled kapitala">
                    <div className="flex flex-col">
                        <Table
                            headings={[
                                "Tip",
                                "Ukupno",
                            ]}
                            rows={table}
                            clickable={true}
                            onClick={(e) => routeChange(e[0])}
                        />
                    </div>
                </Block>
            </>
        )
    }

    function renderMargin() {
        return (
            <>
                <MarginStateBlock/>
                <MarginKapitalBlock/>
            </>
        )
    }

    return (
        <div className='grid gap-5'>
            <Tab tabs={['Kes nalog', 'Margin nalog']} onChange={setSelectedTab}/>
            {selectedTab === "Kes nalog" && renderCash()}
            {selectedTab === "Margin nalog" && renderMargin()}
        </div>
    )
}