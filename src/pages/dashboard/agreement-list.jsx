import React, { useEffect, useState } from "react";
import Block from "../../components/common/Block";
import { getAgreements } from "../../clients/agreementClient";
import AgreementsTable from "../../components/AgreementsTable";

export default function AgreementListPage() {
    const [agreements, setAgreements] = useState([])

    useEffect(() => {
        getAgreements().then(setAgreements)
    }, [])

    return (
        <Block title="Ugovori">
            <AgreementsTable agreements={agreements}/>
        </Block>
    )
}
