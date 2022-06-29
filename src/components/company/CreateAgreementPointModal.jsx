import React, { useState } from "react";
import Modal from "../common/Modal";
import Form from "../common/Form";
import PropTypes from "prop-types";
import Select from "../common/Select";
import TextField, { VALIDATION_PATTERN } from "../common/TextField";
import CurrencyDropdown from "../CurrencyDropdown";
import Button from "../common/Button";
import { createAgreementPoint } from "../../clients/agreementClient";
import Notification from "../common/Notification";
import StocksDropdown from "../StocksDropdown";
import FutureDropdown from "../FutureDropdown";

function CreateAgreementPointModal(props) {
    const [form, setForm] = useState({
        kapitalTypePotrazni: "NOVAC",
        kapitalOznakaPotrazni: "",
        kolicinaPotrazna: "",
        kapitalTypeDugovni: "NOVAC",
        kapitalOznakaDugovni: "",
        kolicinaDugovna: "",
    })
    const [valid, setValid] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await createAgreementPoint({...form, ugovorId: props.agreement.id})
            Notification("Uspesno ste dodali stavku.", "", "success")
            props.onSuccess()
        } catch (e) {
            Notification("Doslo je do greske prilikom dodavanja stavke", "Molimo pokusajte opet.", "danger")
        }
    }

    return (
        <Modal id="create-agreement-modal" title="Dodaj stavku" onClose={props.onClose}>
            <Form onValid={setValid} onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-3 text-xl font-semibold">
                        Potrazna stavka
                    </div>
                    <Select
                        label="Hartija od vrednosti"
                        className="w-full"
                        options={["NOVAC", "AKCIJA", "FUTURES_UGOVOR"]}
                        onChange={(e) => setForm({...form, kapitalTypePotrazni: e})}
                        defValue="NOVAC"
                    />
                    {form['kapitalTypePotrazni'] === "NOVAC" &&
                        <CurrencyDropdown
                            className="w-full"
                            onSelect={e => setForm({...form, kapitalOznakaPotrazni: e['kodValute']})}
                        />
                    }
                    {form['kapitalTypePotrazni'] === "AKCIJA" &&
                        <StocksDropdown
                            className="w-full"
                            onSelect={e => setForm({...form, kapitalOznakaPotrazni: e['oznakaHartije']})}
                        />
                    }
                    {form['kapitalTypePotrazni'] === "FUTURES_UGOVOR" &&
                        <FutureDropdown
                            className="w-full"
                            onSelect={e => setForm({...form, kapitalOznakaPotrazni: e['oznakaHartije']})}
                        />
                    }
                    <TextField
                        label="Kolicina"
                        value={form['kolicinaPotrazna']}
                        onChange={e => setForm({...form, kolicinaPotrazna: e})}
                        validation={VALIDATION_PATTERN.NUMBER}
                        required
                    />
                    <hr className="col-span-3"/>
                    <div className="col-span-3 text-xl font-semibold">
                        Dugovna stavka
                    </div>
                    <Select
                        label="Hartija od vrednosti"
                        className="w-full"
                        options={["NOVAC", "AKCIJA", "FUTURES_UGOVOR"]}
                        onChange={(e) => setForm({...form, kapitalTypeDugovni: e})}
                        defValue="NOVAC"
                    />
                    {form['kapitalTypeDugovni'] === "NOVAC" &&
                        <CurrencyDropdown
                            className="w-full"
                            onSelect={e => setForm({...form, kapitalOznakaDugovni: e['kodValute']})}
                        />
                    }
                    {form['kapitalTypeDugovni'] === "AKCIJA" &&
                        <StocksDropdown
                            className="w-full"
                            onSelect={e => setForm({...form, kapitalOznakaDugovni: e['oznakaHartije']})}
                        />
                    }
                    {form['kapitalTypeDugovni'] === "FUTURES_UGOVOR" &&
                        <FutureDropdown
                            className="w-full"
                            onSelect={e => setForm({...form, kapitalOznakaDugovni: e['oznakaHartije']})}
                        />
                    }
                    <TextField
                        label="Kolicina"
                        value={form['kolicinaDugovna']}
                        onChange={e => setForm({...form, kolicinaDugovna: e})}
                        validation={VALIDATION_PATTERN.NUMBER}
                        required
                    />
                    <div className="col-span-3 flex justify-end gap-5">
                        <Button label="Nazad" design="secondary" onClick={props.onClose}/>
                        <Button label="Dodaj" disabled={!valid} type="submit"/>
                    </div>
                </div>
            </Form>
        </Modal>
    )

}

CreateAgreementPointModal.propTypes = {
    agreement: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    onSuccess: PropTypes.func,
}

export default CreateAgreementPointModal