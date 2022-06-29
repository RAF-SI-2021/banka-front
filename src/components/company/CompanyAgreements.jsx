import React, { useEffect, useState } from "react";
import Block from "../common/Block";
import PropTypes from "prop-types";
import { createAgreement, getAgreementsForCompany } from "../../clients/agreementClient";
import Notification from "../common/Notification";
import Modal from "../common/Modal";
import Form from "../common/Form";
import TextField from "../common/TextField";
import Button from "../common/Button";
import TextArea from "../common/TextArea";
import AgreementsTable from "../AgreementsTable";

function CompanyInformation(props) {
    const [agreements, setAgreements] = useState([])
    const [modal, setModal] = useState(false)
    const [form, setForm] = useState({})
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (!props.company) return
        fetchData()
    }, [props.company])

    function fetchData() {
        getAgreementsForCompany(props.company.id).then(setAgreements)
    }

    function renderModal() {
        async function submitForm(e) {
            e.preventDefault()
            try {
                await createAgreement({...form, companyId: props.company.id})
                fetchData()
                Notification("Uspesno ste kreirali ugovor", "", "success")
                setModal(false)
            } catch (e) {
                Notification("Doslo je do greske prilikom kreiranja ugovora", "Molimo pokusajte opet.", "danger")
            }
        }

        return (
            <Modal id="create-contact-modal" onClose={() => setModal(false)} title="Dodaj kontakt" visible>
                <Form onValid={setFormValid} onSubmit={submitForm} className="grid gap-5">
                    <TextField
                        label="Delovodni broj"
                        onChange={(e) => setForm({...form, delovodniBroj: e})}
                        required
                    />
                    <TextArea
                        label="Opis"
                        onChange={(e) => setForm({...form, description: e})}
                        required
                    />
                    <div className="flex justify-end gap-5">
                        <Button label="Nazad" design="secondary" onClick={() => setModal(false)}/>
                        <Button label="Dodaj" type="submit" disabled={!formValid}/>
                    </div>
                </Form>
            </Modal>
        )
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
            {modal && renderModal()}
        </>
    )
}

CompanyInformation.propTypes = {
    company: PropTypes.object,
}

export default CompanyInformation;