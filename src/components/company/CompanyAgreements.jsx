import React, { useEffect, useState } from "react";
import Block from "../common/Block";
import PropTypes from "prop-types";
import { getAgreementsForCompany } from "../../clients/agreementClient";
import Button from "../common/Button";
import AgreementsTable from "../AgreementsTable";
import CreateAgreementModal from "../../CreateAgreementModal";

function CompanyInformation(props) {
    const [agreements, setAgreements] = useState([])
    const [modal, setModal] = useState(false)

    useEffect(() => {
        if (!props.company) return
        fetchData()
    }, [props.company])

    function fetchData() {
        getAgreementsForCompany(props.company.id).then(setAgreements)
    }

    function renderCta() {
        return (
            <Button label="Dodaj" onClick={() => setModal(true)} design="secondary"/>
        )
    }

    return (
        <>
            <Block title="Ugovori" cta={renderCta()}>
                <AgreementsTable agreements={agreements}/>
            </Block>
            {modal &&
                <CreateAgreementModal
                    company={props.company}
                    onClose={() => setModal(false)}
                    onSuccess={fetchData}
                />}
        </>
    )
}

CompanyInformation.propTypes = {
    company: PropTypes.object,
}

export default CompanyInformation;