import React, { useEffect, useState } from "react";
import Modal from "./components/common/Modal";
import Form from "./components/common/Form";
import TextField from "./components/common/TextField";
import TextArea from "./components/common/TextArea";
import Button from "./components/common/Button";
import { createAgreement, getAgreementsForCompany } from "./clients/agreementClient";
import Notification from "./components/common/Notification";
import PropTypes from "prop-types";
import CompanyDropdown from "./components/CompanyDropdown";

function CreateAgreementModal(props) {
    const [form, setForm] = useState({})
    const [formValid, setFormValid] = useState(false)
    const [company, setCompany] = useState(props.company)

    async function submitForm(e) {
        e.preventDefault()
        try {
            const c = props.company ? props.company : company;

            await createAgreement({...form, companyId: c.id})
            Notification("Uspesno ste kreirali ugovor", "", "success")
            props.onSuccess()
            props.onClose()
        } catch (e) {
            Notification("Doslo je do greske prilikom kreiranja ugovora", "Molimo pokusajte opet.", "danger")
        }
    }

    return (
        <Modal id="create-contact-modal" onClose={props.onClose} title="Dodaj kontakt" visible>
            <Form onValid={setFormValid} onSubmit={submitForm} className="grid gap-5">
                {!props.company && <CompanyDropdown className="w-full" onSelect={setCompany}/>}
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
                    <Button label="Nazad" design="secondary" onClick={props.onClose}/>
                    <Button label="Dodaj" type="submit" disabled={!formValid}/>
                </div>
            </Form>
        </Modal>
    )
}

CreateAgreementModal.propTypes = {
    company: PropTypes.object,
    onSuccess: PropTypes.func,
    onClose: PropTypes.func,
}

export default CreateAgreementModal