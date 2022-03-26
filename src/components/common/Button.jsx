import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Button(props) {
  const classes = classNames(
    "text-base",
    "font-sans",
    "bg-indigo-500 hover:bg-indigo-700", // background
    "text-white text-base", // text
    "py-2 px-4", //spacing
    "rounded", // border
    "transition ease-in-out", // effects
    props.className // custom style
  );

  return (
    <button className={classes} type="button" onClick={props.onClick}>
      {props.label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: "",
};

export default Button;
