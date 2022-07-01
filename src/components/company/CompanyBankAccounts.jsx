import React, { useEffect, useState } from "react";
import Block from "../common/Block";
import PropTypes from "prop-types";
import Table from "../common/Table";
import Button from "../common/Button";
import {
    createCompanyBankAccount, deleteCompanyBankAccount, editCompanyBankAccount,
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
    const [selected, setSelected] = useState(null)

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
                if (selected) {
                    await editCompanyBankAccount({
                        ...form,
                        companyId: props.company.id,
                        active: true,
                        id: selected['id']
                    })
                } else {
                    await createCompanyBankAccount({...form, companyId: props.company.id, active: true})
                }
                fetchData()
                Notification("Uspesno ste uneli racun", "", "success")
                setModal(false)
            } catch (e) {
                Notification("Doslo je do greske prilikom dodavanje racuna", "Molimo pokusajte opet.", "danger")
            }
        }

        async function handleDeleteAccount() {
            if (!selected) return
            try {
                await deleteCompanyBankAccount(selected['id'])
                Notification("Uspesno ste obrisali racun", "", "success")
            } catch (e) {
                Notification("Doslo je do greske", "Molimo pokusajte opet.", "danger")
            }
        }

        return (
            <Modal id="create-contact-modal" onClose={handleCloseModal}
                   title={selected ? "Izmeni racun" : "Dodaj racun"} visible>
                <Form onValid={setFormValid} onSubmit={submitForm} className="grid gap-5">
                    <CurrencyDropdown
                        selected={selected && selected['valuta']['kodValute']}
                        onSelect={(e) => setForm({...form, valutaId: e['id']})}
                        className="w-full"
                    />
                    <TextField
                        label="Broj racuna"
                        placeholder="123456789"
                        value={selected && selected['brojRacuna']}
                        onChange={(e) => setForm({...form, brojRacuna: e})}
                        required
                    />
                    <TextField
                        label="Banka"
                        placeholder="Banka"
                        value={selected && selected['banka']}
                        onChange={(e) => setForm({...form, banka: e})}
                        required
                    />
                    <div className="flex justify-end gap-5">
                        {selected && <Button label="Obrisi" design="danger" onClick={handleDeleteAccount}/>}
                        <Button label="Nazad" design="secondary" onClick={handleCloseModal}/>
                        <Button label={selected ? "Izmeni" : "Dodaj"} type="submit" disabled={!formValid}/>
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

    function handleCloseModal() {
        setForm(null)
        setSelected(null)
        setModal(false)
    }

    function handleRowClick(e) {
        const found = bankAccounts.find(b => {
            return b['id'] === e[0]
        })
        setSelected(found)
        setModal(true)
    }

    function createTableRows() {
        const rows = []
        bankAccounts.map(c => {
            rows.push([
                c['id'],
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
                    headings={['ID', 'Valuta', 'Banka', 'Broj racuna', 'Aktivan']}
                    rows={createTableRows()}
                    onClick={handleRowClick}
                    clickable
                />
            </Block>
            {modal && renderModal()}
        </>
    )
}

CompanyBankAccounts.propTypes = {
    company: PropTypes.object,
}

export default CompanyBankAccounts;