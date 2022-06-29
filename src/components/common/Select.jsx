import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CurrencyDropdown from "../CurrencyDropdown";

function Select(props) {
    const style = classNames(
        "border border-gray-300 rounded",
        "p-2", //spacing
        "bg-white",
        props.className
    );

    return (
        <div>
            {props.label && <div className="text-sm text-slate-500 pb-1 text-left">{props.label}</div>}
            <select
                data-testid="common-select"
                className={style}
                onChange={(e) => props.onChange(e.target.value)}
                required={props.required}
            >
                {!props.defValue && <option disabled={!!props.defValue}/>}
                {props.options.map((o) =>
                    o == props.defValue ? (
                        <option data-testid="common-select-option" key={o} value={o} selected>
                            {o}
                        </option>
                    ) : (
                        <option data-testid="common-select-option" key={o} value={o}>
                            {o}
                        </option>
                    )
                )}
            </select>
        </div>

    );
}

Select.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    defValue: PropTypes.string,
};

Select.defaultProps = {
    required: false,
}

export default Select;
