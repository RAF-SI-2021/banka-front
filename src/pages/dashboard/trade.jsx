import React, { useEffect, useState } from "react";
import TextField, {
    VALIDATION_PATTERN,
} from "../../components/common/TextField";
import RadioGroup from "../../components/common/RadioGroup";
import Checkbox from "../../components/common/Checkbox";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { getUserId } from "../../clients/client";
import { buySellStocks } from "../../clients/stocks";
import Block from "../../components/common/Block";
import Form from "../../components/common/Form";
import Notification from "../../components/common/Notification";
import CurrencyDropdown from "../../components/CurrencyDropdown";
import StocksDropdown from "../../components/StocksDropdown";

const TYPE = {
    STOCKS: "Stocks",
    FOREX: "Forex",
    FUTURES: "Futures",
};

const DEFAULT_FORM = {
    symbol: "",
    hartijaOdVrednostiTip: TYPE.STOCKS,
    kolicina: "",
    akcija: "BUY",
    limitValue: 0,
    stopValue: 0,
    allOrNoneFlag: false,
    marginFlag: false,
}

export default function TradePage() {
    const [loading, setLoading] = useState(false)
    const [formValid, setFormValid] = useState(false);
    const [securityType, setSecurityType] = useState(TYPE.STOCKS);
    const [form, setForm] = useState(DEFAULT_FORM);
    // This is 5min hack for Autocomplete component that can't be reset easy.
    // It can't get worse than this
    const [hack, setHack] = useState(false)

    const [forexForm, setForexForm] = useState({
        from: "",
        to: "",
    });

    const [id, setId] = useState(null);

    async function getId() {
        setId(await getUserId());
    }

    const onChange = (event) => {
        setForm({...form, ...event});
    };

    const onForexChange = (event) => {
        setForexForm({...forexForm, ...event});
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        try {
            await buySellStocks(form);
            Notification("", "Uspesno ste izvrsili trgovinu.", "success")
            setLoading(false)
            setForm(DEFAULT_FORM)
            setHack(true)
            setHack(false)
        } catch (e) {
            Notification("Doslo je do greske", "Molimo pokusajte opet.", "danger")
            setLoading(false)
        }
    }

    useEffect(() => {
        getId();
        onChange({userId: id});
    }, []);

    useEffect(() => {
        setForm({...form, symbol: forexForm.from + " " + forexForm.to});
    }, [forexForm]);

    useEffect(() => {
        switch (securityType) {
            case TYPE.STOCKS:
                setForm({...form, hartijaOdVrednostiTip: "AKCIJA"})
                break;
            case TYPE.FOREX:
                setForm({...form, hartijaOdVrednostiTip: "FOREX"})
                break;
            case TYPE.FUTURES:
                setForm({...form, hartijaOdVrednostiTip: "FUTURES_UGOVOR"})
                break;
        }
    }, [securityType]);

    function renderStocks() {
        return (
            <>
                <div className="flex">
                    <StocksDropdown allowCustom onSelect={(e => onChange({symbol: e}))}/>
                </div>
                <div className="flex items-end gap-3">
                    <TextField
                        label="Kolicina"
                        className="grow"
                        value={form["kolicina"]}
                        onChange={(e) => onChange({kolicina: e})}
                        validation={VALIDATION_PATTERN.NUMBER}
                        required
                    />
                    <RadioGroup
                        options={["BUY", "SELL"]}
                        onChange={function (e) {
                            onChange({akcija: e});
                        }}
                    />
                </div>
            </>
        );
    }

    function renderForex() {
        return (
            <>
                <div className="flex gap-4">
                    <CurrencyDropdown onSelect={(e => onForexChange({from: e['kodValute']}))}/>
                    <CurrencyDropdown onSelect={(e => onForexChange({to: e['kodValute']}))}/>
                </div>
                <div className="flex">
                    <TextField
                        label="Kolicina"
                        className="grow"
                        value={form["kolicina"]}
                        onChange={(e) => onChange({kolicina: e})}
                        validation={VALIDATION_PATTERN.NUMBER}
                        required
                    />
                </div>
            </>
        );
    }

    function renderShared() {
        return (
            <>
                <div className="flex gap-3">
                    <TextField
                        label="Limit"
                        onChange={(e) => onChange({limitValue: e})}
                        value={form["limitValue"]}
                        validation={VALIDATION_PATTERN.NUMBER}
                        required
                    />
                    <TextField
                        label="Stop"
                        onChange={(e) => onChange({stopValue: e})}
                        value={form["stopValue"]}
                        validation={VALIDATION_PATTERN.NUMBER}
                        required
                    />
                </div>
                <div>
                    <div className="text-xs">
                        * Ako su oba 0 onda se radi Market Order
                    </div>
                    <div className="text-xs">
                        * Ako je jedan stavljen, a drugi 0, radi se šta ste odabrail (Limit
                        ili Stop Order)
                    </div>
                    <div className="text-xs">
                        * Ako su oba stavljena, radi se Stop-Limit order
                    </div>
                </div>
                <div className="flex gap-5">
                    <Checkbox
                        label="All or none"
                        onChange={(e) => onChange({allOrNoneFlag: e})}
                        value={form["allOrNoneFlag"]}
                    />
                    {securityType !== TYPE.FOREX &&
                        <Checkbox
                            label="Margina"
                            onChange={(e) => onChange({marginFlag: e})}
                            value={form["marginFlag"]}
                        />}
                </div>
            </>
        );
    }

    function renderForm() {
        return (
            <>
                {(securityType === TYPE.STOCKS ||
                        securityType === TYPE.FUTURES) &&
                    renderStocks()}
                {securityType === TYPE.FOREX && renderForex()}
                {renderShared()}
            </>
        );
    }

    return (
        <Block title="Trgovina">
            {!hack && <Form onSubmit={handleSubmit} onValid={setFormValid}>
                <div className="flex flex-col gap-3">
                    <Select
                        label="Hartija vrednosti"
                        className="grow"
                        onChange={(e) => setSecurityType(e)}
                        options={[TYPE.STOCKS, TYPE.FOREX, TYPE.FUTURES]}
                        defValue={TYPE.STOCKS}
                    />
                    {securityType && renderForm()}
                    <div>
                        <Button label="Naruci" type="submit" disabled={!formValid} loading={loading}/>
                    </div>
                </div>
            </Form>}
        </Block>
    );
}
