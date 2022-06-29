import React, { useEffect, useState } from "react";
import Block from "../../components/common/Block";
import { getAgreements } from "../../clients/agreementClient";
import AgreementsTable from "../../components/AgreementsTable";
import Button from "../../components/common/Button";
import CreateAgreementModal from "../../CreateAgreementModal";

export default function AgreementListPage() {
    const [agreements, setAgreements] = useState([])
    const [modal, setModal] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        getAgreements().then(setAgreements)
    }

    function renderCta() {
        return (
            <Button label="Dodaj" design="secondary" onClick={() => setModal(true)}/>
        )
    }

    return (
        <Block title="Ugovori" cta={renderCta()}>
            <AgreementsTable agreements={agreements}/>
            {modal && <CreateAgreementModal onClose={() => setModal(false)} onSuccess={fetchData}/>}
        </Block>
    )
}
