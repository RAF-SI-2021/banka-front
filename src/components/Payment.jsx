import React, { useState } from "react";
import { performPayment } from "../clients/capital";
import Alert from "./common/Alert";
import TextField, { VALIDATION_PATTERN } from "./common/TextField";
import Button from "./common/Button";
import Form from "./common/Form";
import Notification from "./common/Notification";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { isSupervisor } from "../utils";
import { getAccountCashStateSupervisor } from "../clients/accountClient";
import { addTransactionsAction } from "../redux/actions";
import CurrencyDropdown from "./CurrencyDropdown";

function Payment(props) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.app.user)
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        valutaOznaka: "",
        iznos: 0
    });
    const [loading, setLoading] = useState(false)
    const [formValid, setFormValid] = useState(false)

    function handleChange(e) {
        setForm({...form, ...e});
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const tmp = {
                "opis": form.iznos >= 0 ? "Uplata sredstava" : "Isplata sredstava",
                "valutaOznaka": form.valutaOznaka,
                "uplata": form.iznos >= 0 ? form.iznos : 0,
                "isplata": form.iznos < 0 ? -1 * form.iznos : 0,
                "rezervisano": 0,
                "lastSegment": false,
                "type": "NOVAC"
            };
            console.log(tmp);
            setLoading(true)
            await performPayment(tmp);
            if (isSupervisor(user)) {
                dispatch(addTransactionsAction(await getAccountCashStateSupervisor()))
            }
            setLoading(false)
            Notification("", "Uspesno ste izvrsili uplatu.", "success")
            props.onDone()
        } catch (e) {
            setError(true);
            setLoading(false)
        }
    }


    return (
        <div>
            {error && (
                <Alert
                    design="danger"
                    text="Greska pri uplati/isplati"
                    onDismiss={() => setError(null)}
                ></Alert>
            )}
            <Form className="grid gap-5" onValid={setFormValid} onSubmit={handleSubmit}>
                <div className="flex gap-5">
                    <CurrencyDropdown
                        onSelect={e => handleChange({valutaOznaka: e['kodValute']})}
                        required
                    />
                    <div className="grow">
                        <TextField
                            label="Iznos"
                            onChange={(e) => handleChange({iznos: e})}
                            validation={VALIDATION_PATTERN.NUMBER}
                            required
                        />
                    </div>
                </div>
                <Button
                    label="Realizuj"
                    type="submit"
                    loading={loading}
                    disabled={!formValid}
                />
            </Form>
        </div>
    );

}

Payment.propTypes = {
    onDone: PropTypes.func,
}

export default Payment