import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Block from "../common/Block";
import { createCompanyContact, getCompanyContact } from "../../clients/companyClient";
import Modal from "../common/Modal";
import Form from "../common/Form";
import TextField, { VALIDATION_PATTERN } from "../common/TextField";
import Button from "../common/Button";
import Notification from "../common/Notification";
import Table from "../common/Table";

function CompanyInformation(props) {
    const [contacts, setContacts] = useState([])
    const [modal, setModal] = useState(false)
    const [form, setForm] = useState({})
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (!props.company) return
        fetchData()
    }, [props.company])

    function fetchData() {
        getCompanyContact(props.company.id).then((e) => setContacts(e))
    }

    function renderModal() {
        async function submitForm(e) {
            e.preventDefault()
            try {
                await createCompanyContact({...form, companyId: props.company.id})
                fetchData()
                Notification("Uspesno ste uneli kontakt osobu", "", "success")
            } catch (e) {
                Notification("Doslo je do greske prilikom dodavanje kontakt osobe", "Molimo pokusajte opet.", "danger")
            }
        }

        return (
            <Modal id="create-contact-modal" onClose={() => setModal(false)} title="Dodaj kontakt" visible>
                <Form onValid={setFormValid} onSubmit={submitForm} className="grid gap-5">
                    <TextField
                        label="Ime"
                        placeholder="Petar"
                        onChange={(e) => setForm({...form, ime: e})}
                        required
                    />
                    <TextField
                        label="Prezime"
                        placeholder="Petrovic"
                        onChange={(e) => setForm({...form, prezime: e})}
                        required
                    />
                    <TextField
                        label="Email"
                        placeholder="email@email.com"
                        onChange={(e) => setForm({...form, email: e})}
                        validation={VALIDATION_PATTERN.EMAIL}
                        required
                    />
                    <TextField
                        label="Broj telefona"
                        placeholder="123456789"
                        onChange={(e) => setForm({...form, brojTelefona: e})}
                        validation={VALIDATION_PATTERN.NUMBER}
                        required
                    />
                    <TextField
                        label="Pozicija"
                        placeholder="pozicija"
                        onChange={(e) => setForm({...form, pozicija: e})}
                        required
                    />
                    <TextField
                        label="Napomena"
                        placeholder="napomena"
                        onChange={(e) => setForm({...form, napomena: e})}
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

    function createTableRows() {
        const rows = []
        contacts.map(c => {
            rows.push([
                c['ime'],
                c['prezime'],
                c['email'],
                c['brojTelefona'],
                c['pozicija'],
                c['napomena'],
            ])
        })
        return rows
    }

    return (
        <>
            <Block title="Kontakt osobe" cta={renderCta()}>
                <Table
                    headings={['Ime', 'Prezime', 'Email', 'Broj telefona', 'Pozicija', 'Napomena']}
                    rows={createTableRows()}/>
            </Block>
            {modal && renderModal()}
        </>
    )
}

CompanyInformation.propTypes = {
    company: PropTypes.object,
}

export default CompanyInformation;