import React from "react";
import classNames from "classnames";

export default function TextField(props) {
  const classes = classNames(
    "box-border h-10 w-96",
    "text-lg",
    "font-sans",
    "bg-white-50 hover:bg-white-50", // background
    "text-gray text-base", // text
    "py-2 px-4", //spacing
    "rounded", // border
    "transition ease-in-out", // effects
    props.className // custom style
  );

  return (
    <input
      type="text"
      style={{ border: "1px solid black" }}
      placeholder={props.placeholder}
      className={classes}
    />
  );
}
