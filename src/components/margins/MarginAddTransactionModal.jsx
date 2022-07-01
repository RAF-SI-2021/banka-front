import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../common/Modal";
import CurrencyDropdown from "../CurrencyDropdown";
import TextField, { VALIDATION_PATTERN } from "../common/TextField";
import Button from "../common/Button";
import Form from "../common/Form";
import { createTransaction } from "../../clients/marginClient";
import Notification from "../common/Notification";

function MarginAddTransactionModal(props) {
    const [amount, setAmount] = useState("")
    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(false)

    async function submitForm(e) {
        e.preventDefault()
        setLoading(true)
        try {
            await createTransaction(amount)
            Notification("Uspesno ste dodali transakciju", "", "success")
            setLoading(false)
            props.onSuccess()
            props.onClose()
        } catch (e) {
            setLoading(false)
            Notification("Doslo je do greske", "Molimo pokusajte opet.", "danger")
        }
    }

    return (
        <Modal id="margin-modal" title="Uplata" onClose={props.onClose}>
            <Form onValid={setValid} className="grid gap-5" onSubmit={submitForm}>
                <div className="flex gap-5">
                    <CurrencyDropdown selected="USD" disabled/>
                    <div className="grow">
                        <TextField label="Iznos" value={amount} onChange={setAmount}
                                   validation={VALIDATION_PATTERN.NUMBER} required/>
                    </div>
                </div>
                <div className="flex justify-end gap-5">
                    <Button label="Nazad" design={"secondary"} onClick={props.onClose}/>
                    <Button label="Uplati" type={"submit"} loading={loading} disabled={!valid}/>
                </div>
            </Form>
        </Modal>
    )
}

MarginAddTransactionModal.propTypes = {
    onClose: PropTypes.func,
    onSuccess: PropTypes.func,
}

export default MarginAddTransactionModal