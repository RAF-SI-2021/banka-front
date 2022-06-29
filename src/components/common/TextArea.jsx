import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

function TextArea(props) {
    const [value, setValue] = useState(props.value);

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
        {"bg-gray-50": props.readOnly === true},
        props.className // custom style
    );

    function handleChange(e) {
        setValue(e.target.value);
        props.onChange(e.target.value);
    }

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return (
        <div className="flex flex-col justify-start">
            {props.label && <div className="text-sm text-slate-500 pb-1 text-left">{props.label}</div>}
            <textarea
                data-testid="common-textarea"
                value={value}
                placeholder={props.placeholder}
                className={classes}
                onChange={handleChange}
                required={props.required}
                disabled={props.readOnly}
            />
        </div>
    )
}


TextArea.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
};

TextArea.defaultProps = {
    value: "",
    readOnly: false,
};

export default TextArea