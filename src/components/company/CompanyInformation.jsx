import React, { useEffect, useState } from "react";
import Block from "../common/Block";
import PropTypes from "prop-types";
import TextField from "../common/TextField";
import Form from "../common/Form";
import Button from "../common/Button";
import { editCompany } from "../../clients/companyClient";
import Notification from "../common/Notification";

function CompanyInformation(props) {
    const [form, setForm] = useState(null)
    const [loading, setLoading] = useState(false)

    function renderPlaceholder() {
        return null
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        try {
            await editCompany(form)
            Notification("Uspesno ste izmenili informacije.", "", "success")
            setLoading(false)
        } catch (e) {
            setLoading(false)
            Notification("Doslo je do greske", "Molimo pokusajte opet.", "danger")
        }
    }

    useEffect(() => {
        setForm(props.company)
    }, [props.company])

    function renderContent() {
        return (
            <Form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid grid-cols-2 gap-5">
                    <TextField label="Naziv" value={form.naziv}/>
                    <TextField label="Sifra delatnosti" value={form.sifraDelatnosti}/>
                    <TextField label="Maticni broj" value={form.maticniBroj}/>
                    <TextField label="PIB" value={form.pib}/>
                    <TextField label="Adresa" value={form.adresa}/>
                    <TextField label="Drzava" value={form.drzava}/>
                </div>
                <div className="flex justify-end">
                    <Button label="Azuriraj" type={"submit"} design="secondary"/>
                </div>
            </Form>
        )
    }

    return (
        <Block title="Podaci">
            {!form && renderPlaceholder()}
            {form && renderContent()}
        </Block>
    )
}

CompanyInformation.propTypes = {
    company: PropTypes.object,
    onEdit: PropTypes.func,
}

export default CompanyInformation;