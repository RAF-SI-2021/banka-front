import React, { useState } from "react";
import Modal from "../common/Modal";
import PropTypes from "prop-types";
import TextField from "../common/TextField";
import Form from "../common/Form";
import Button from "../common/Button";
import { createCompany } from "../../clients/companyClient";
import Notification from "../common/Notification";

function CreateCompanyModal(props) {
    const [formValid, setFormValid] = useState(false)
    const [form, setForm] = useState(null)

    async function submitForm(e) {
        e.preventDefault()
        try {
            await createCompany(form)
            Notification("Uspesno ste uneli kompaniju", "", "success")
            props.onSuccess()
        } catch (e) {
            Notification("Doslo je do greske prilikom pravljenja kompanije", "Molimo pokusajte opet.", "danger")
        }
    }

    return (
        <Modal
            title="Kreiraj kompaniju"
            onClose={props.onClose}
            id="create-company"
            visible>
            <Form className='grid gap-5' onValid={setFormValid} onSubmit={submitForm}>
                <TextField label="Naziv" onChange={(e) => setForm({...form, "naziv": e})} required/>
                <TextField
                    label="Maticni broj"
                    onChange={(e) => setForm({...form, "maticniBroj": e})}
                    validation="^[0-9]{13}$" required/>
                <TextField
                    label="PIB"
                    onChange={(e) => setForm({...form, "pib": e})}
                    validation="^[0-9]{9}$"
                    required/>
                <TextField
                    label="Sifra delatnosti"
                    onChange={(e) => setForm({...form, "sifraDelatnosti": e})}
                    required/>
                <TextField
                    label="Adresa"
                    onChange={(e) => setForm({...form, "adresa": e})}
                    required/>
                <TextField
                    label="Drzava"
                    onChange={(e) => setForm({...form, "drzava": e})}
                    required/>
                <div className="flex justify-end gap-5">
                    <Button label="Zatvori" design="secondary" onClick={props.onClose}/>
                    <Button label="Kreiraj" disabled={!formValid} type="submit"/>
                </div>
            </Form>
        </Modal>
    )
}

CreateCompanyModal.propTypes = {
    onClose: PropTypes.func,
    onSuccess: PropTypes.func,
}

export default CreateCompanyModal;