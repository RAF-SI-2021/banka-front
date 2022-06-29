import React, { useState } from "react";
import Modal from "../common/Modal";
import Form from "../common/Form";
import PropTypes from "prop-types";
import Select from "../common/Select";
import TextField, { VALIDATION_PATTERN } from "../common/TextField";
import CurrencyDropdown from "../CurrencyDropdown";
import Button from "../common/Button";
import { createAgreementPoint, deleteAgreementPoint, editAgreementPoint } from "../../clients/agreementClient";
import Notification from "../common/Notification";
import StocksDropdown from "../StocksDropdown";
import FutureDropdown from "../FutureDropdown";

const DEFAULT_FORM = {
    kapitalTypePotrazni: "NOVAC",
    kapitalPotrazniOznaka: "",
    kolicinaPotrazna: "",
    kapitalTypeDugovni: "NOVAC",
    kapitalDugovniOznaka: "",
    kolicinaDugovna: "",
}

function AgreementPointModal(props) {
    const [edit] = useState(!!props.point)
    const [form, setForm] = useState(props.point ? props.point : DEFAULT_FORM)
    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        try {
            let r = {
                ...form,
                ugovorId: props.agreement.id,
                kolicinaDugovna: parseInt(form['kolicinaDugovna']),
                kolicinaPotrazna: parseInt(form['kolicinaPotrazna'])
            }
            if (edit) {
                r = {...form, stavkaId: form.id}
                await editAgreementPoint(r)
            } else {
                await createAgreementPoint(r)
            }

            Notification("Uspesno ste dodali stavku.", "", "success")
            setLoading(false)
            props.onSuccess()
            props.onClose()
        } catch (e) {
            setLoading(false)
            Notification("Doslo je do greske prilikom dodavanja stavke", "Molimo pokusajte opet.", "danger")
        }
    }

    async function handleDeletePoint(e) {
        try {
            await deleteAgreementPoint(e)
            Notification("Uspesno ste obrisali stavku", "", "success")
            props.onSuccess()
            props.onClose()
        } catch (e) {
            Notification("Doslo je do greske", "Molimo pokusajte opet.", "danger")
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
                        defValue={form['kapitalTypePotrazni']}
                        required
                    />
                    {form['kapitalTypePotrazni'] === "NOVAC" &&
                        <CurrencyDropdown
                            className="w-full"
                            selected={form['kapitalPotrazniOznaka']}
                            onSelect={e => setForm({
                                ...form,
                                kapitalPotrazniOznaka: e['kodValute'],
                                kapitalPotrazniId: e['id']
                            })}
                            requried
                        />
                    }
                    {form['kapitalTypePotrazni'] === "AKCIJA" &&
                        <StocksDropdown
                            className="w-full"
                            selected={form['kapitalPotrazniOznaka']}
                            onSelect={e => setForm({
                                ...form,
                                kapitalPotrazniOznaka: e['oznakaHartije'],
                                kapitalPotrazniId: e['id']
                            })}
                            requried
                        />
                    }
                    {form['kapitalTypePotrazni'] === "FUTURES_UGOVOR" &&
                        <FutureDropdown
                            className="w-full"
                            selected={form['kapitalPotrazniOznaka']}
                            onSelect={e => setForm({
                                ...form,
                                kapitalPotrazniOznaka: e['oznakaHartije'],
                                kapitalPotrazniId: e['id']
                            })}
                            requried
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
                        defValue={form["kapitalTypeDugovni"]}
                        requried
                    />
                    {form['kapitalTypeDugovni'] === "NOVAC" &&
                        <CurrencyDropdown
                            className="w-full"
                            onSelect={e => setForm({
                                ...form,
                                kapitalDugovniOznaka: e['kodValute'],
                                kapitalDugovniId: e['id']
                            })}
                            selected={form["kapitalDugovniOznaka"]}
                            requried
                        />
                    }
                    {form['kapitalTypeDugovni'] === "AKCIJA" &&
                        <StocksDropdown
                            className="w-full"
                            onSelect={e => setForm({
                                ...form,
                                kapitalDugovniOznaka: e['oznakaHartije'],
                                kapitalDugovniId: e['id']
                            })}
                            selected={form["kapitalDugovniOznaka"]}
                            requried
                        />
                    }
                    {form['kapitalTypeDugovni'] === "FUTURES_UGOVOR" &&
                        <FutureDropdown
                            className="w-full"
                            onSelect={e => setForm({
                                ...form,
                                kapitalDugovniOznaka: e['oznakaHartije'],
                                kapitalDugovniId: e['id']
                            })}
                            selected={form["kapitalDugovniOznaka"]}
                            required
                        />
                    }
                    <TextField
                        label="Kolicina"
                        value={form['kolicinaDugovna']}
                        onChange={e => setForm({...form, kolicinaDugovna: e})}
                        validation={VALIDATION_PATTERN.NUMBER}
                        selected={form["kolicinaDugovna"]}
                        required
                    />
                    <div className="col-span-3 flex justify-end gap-5">
                        {edit &&
                            <Button label="Obrisi" design='danger'
                                    onClick={() => handleDeletePoint(props.point['id'])}/>}
                        <Button label="Nazad" design="secondary" onClick={props.onClose}/>
                        <Button label={edit ? "Izmeni" : "Dodaj"} disabled={!valid} type="submit" loading={loading}/>
                    </div>
                </div>
            </Form>
        </Modal>
    )

}

AgreementPointModal.propTypes = {
    agreement: PropTypes.object.isRequired,
    point: PropTypes.object,
    onClose: PropTypes.func,
    onSuccess: PropTypes.func,
}

AgreementPointModal.defaultProps = {}

export default AgreementPointModal