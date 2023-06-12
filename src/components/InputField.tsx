import "../styles/inputField.css";
import React, { ForwardedRef, forwardRef, RefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface InputFieldProps {
  placeholder?: string;
  inputType?: string;
  name: string;
  step?: string;
  value?: any;
  isRequired?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  isValid?: boolean;
  key?: number;
  icon?: IconDefinition;
  style?: React.CSSProperties;
}

const InputField = forwardRef(
  (
    {
      placeholder,
      onChange,
      name,
      isRequired,
      value,
      step,
      isValid,
      errorMessage,
      icon,
      style,
      inputType,
    }: InputFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="inputContainer" style={style}>
        <input
          ref={ref}
          className="inputField"
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
          required={isRequired}
          step={step}
        />
        {icon && (
          <span className="inputFieldIcon">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
        {errorMessage && !isValid && (
          <span className="error">{errorMessage}</span>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";
export default InputField;
