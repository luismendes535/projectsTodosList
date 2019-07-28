import React from "react";
import classes from "./Input.module.css";

const input = ({
  invalid,
  label,
  shouldValidate,
  touched,
  changed,
  elementConfig,
  elementType,
  value
}) => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];
  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
  }
  switch (elementType) {
    case "input":
      inputElement = (
        <input
          onChange={changed}
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={changed}
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={changed}
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label>{label}</label>
      {inputElement}
    </div>
  );
};

export default input;
