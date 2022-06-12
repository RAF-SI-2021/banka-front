import React, {useState} from "react";
import {performPayment} from "../clients/capital";
import Alert from "./common/Alert";
import TextField, {VALIDATION_PATTERN} from "./common/TextField";
import Button from "./common/Button";
import Form from "./common/Form";
import { Store } from "react-notifications-component";
import PropTypes from "prop-types";

function Payment(props) {
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
            setLoading(false)
            Store.addNotification({
                title: "",
                message: `Uspesno ste izvrsili uplatu.`,
                type: "success",
                container: "top-right",
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
            props.onDone()
        } catch (e) {
            setError(true);
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
            <Form className="flex flex-col gap-3" onValid={setFormValid} onSubmit={handleSubmit}>
                <TextField
                    label="Iznos"
                    onChange={(e) => handleChange({iznos: e})}
                    validation={VALIDATION_PATTERN.NUMBER}
                    required
                />
                <TextField
                    label="Valuta"
                    placeholder="RSD"
                    onChange={(e) => handleChange({valutaOznaka: e})}
                    required
                />
                <div className="flex flex-row gap-3">
                    <Button
                        label="Realizuj"
                        type="submit"
                        loading={loading}
                        disabled={!formValid}
                    />
                </div>
            </Form>
        </div>
    );

}

Payment.propTypes = {
    onDone: PropTypes.func,
}

export default Payment