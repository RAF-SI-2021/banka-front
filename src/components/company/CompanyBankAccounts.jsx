import React, { useEffect, useState } from "react";
import Block from "../common/Block";
import PropTypes from "prop-types";
import Table from "../common/Table";
import Button from "../common/Button";
import {
    createCompanyBankAccount,
    getCompanyBankAccounts,
} from "../../clients/companyClient";
import Notification from "../common/Notification";
import Modal from "../common/Modal";
import Form from "../common/Form";
import TextField from "../common/TextField";
import CurrencyDropdown from "../CurrencyDropdown";

function CompanyBankAccounts(props) {
    const [bankAccounts, setBankAccounts] = useState([])
    const [modal, setModal] = useState(false)
    const [form, setForm] = useState({})
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (!props.company) return
        fetchData()
    }, [props.company])

    function fetchData() {
        getCompanyBankAccounts(props.company.id).then((e) => setBankAccounts(e))
    }

    function renderModal() {
        async function submitForm(e) {
            e.preventDefault()
            try {
                await createCompanyBankAccount({...form, companyId: props.company.id, active: true})
                fetchData()
                Notification("Uspesno ste uneli racun", "", "success")
            } catch (e) {
                Notification("Doslo je do greske prilikom dodavanje racuna", "Molimo pokusajte opet.", "danger")
            }
        }

        return (
            <Modal id="create-contact-modal" onClose={() => setModal(false)} title="Dodaj kontakt" visible>
                <Form onValid={setFormValid} onSubmit={submitForm} className="grid gap-5">
                    <CurrencyDropdown onSelect={(e) => setForm({...form, valutaId: e['id']})} className="w-full"/>
                    <TextField
                        label="Broj racuna"
                        placeholder="123456789"
                        onChange={(e) => setForm({...form, brojRacuna: e})}
                        required
                    />
                    <TextField
                        label="Banka"
                        placeholder="Banka"
                        onChange={(e) => setForm({...form, banka: e})}
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

    function createTableRows() {
        const rows = []
        bankAccounts.map(c => {
            rows.push([
                c['valuta']['kodValute'],
                c['banka'],
                c['brojRacuna'],
                `${c['active']}`,
            ])
        })
        return rows
    }

    return (
        <>
            <Block title="Racuni" cta={renderCta()}>
                <Table
                    headings={['Valuta', 'Banka', 'Broj racuna', 'Aktivan']}
                    rows={createTableRows()}/>
            </Block>
            {modal && renderModal()}
        </>
    )
}

CompanyBankAccounts.propTypes = {
    company: PropTypes.object,
}

export default CompanyBankAccounts;