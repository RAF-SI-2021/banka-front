import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TEXT_FIELD_TYPE = {
    TEXT: "text",
    PASSWORD: "password",
};

export const VALIDATION_PATTERN = {
    NUMBER: /^\d+$/,
    EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
}

function TextField(props) {
    const [value, setValue] = useState(props.value);
    const [valid, setValid] = useState(true)

    const classes = classNames(
        "border-2 border-gray-300",
        "min-widht",
        "font-sans",
        "dark:text-slate-900 bg-white-50", // background
        "text-base", // text
        "py-2 px-4", //spacing
        "rounded", // border
        "transition ease-in-out", // effects
        "placeholder:text-gray-300",
        {"outline-none": valid === true},
        {"outline outline-red-500": valid === false},
        {"bg-gray-50": props.readOnly === true},
        props.className // custom style
    );

    function isValid() {
        let isValid = false;
        const pattern = new RegExp(props.validation)
        if (value === "") {
            isValid = true;
        } else if (props.validation) {
            isValid = pattern.test(value)
        } else {
            isValid = true;
        }

        setValid(isValid)
    }

    function handleChange(e) {
        setValue(e);
        props.onChange(e);
    }

    useEffect(() => {
        handleChange(props.value);
    }, [props.value]);

    useEffect(() => {
        if (value) {
            isValid();
            props.onChange(value)
        }
    }, [value]);

    useEffect(() => {
        props.onValid(valid)
    }, [valid]);

    return (
        <div className="flex flex-col justify-start">
            {props.label && <div className="text-sm text-slate-500 pb-1 text-left">{props.label}</div>}
            <input
                data-testid="common-text-field"
                value={value}
                type={props.type}
                placeholder={props.placeholder}
                className={classes}
                onChange={(e) => handleChange(e.target.value)}
                required={props.required}
                disabled={props.readOnly}
            />
        </div>
    );
}

TextField.propTypes = {
    value: PropTypes.string,
    type: PropTypes.oneOf([TEXT_FIELD_TYPE.TEXT, TEXT_FIELD_TYPE.PASSWORD]),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    validation: PropTypes.string,
    className: PropTypes.string,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    onValid: PropTypes.func,
};

TextField.defaultProps = {
    type: TEXT_FIELD_TYPE.TEXT,
    value: "",
    readOnly: false,
    onValid: () => {
    },
    onChange: () => {
    },
};

export default TextField;
