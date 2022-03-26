import React from "react";
import classNames from "classnames";

export default function TextField(props) {
  const classes = classNames(
    "border-2 border-gray-300",
    "min-widht",
    "font-sans",
    "text-base",
    "bg-white-50", // background
    "text-gray text-base", // text
    "py-2 px-4", //spacing
    "rounded", // border
    "transition ease-in-out", // effects
    props.className // custom style
  );

  return (
    <input type="text" placeholder={props.placeholder} className={classes} />
  );
}
