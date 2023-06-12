import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/button.css";

interface buttonProps {
  buttonType?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  loading?: boolean;
  onLoadingText?: string;
}

const Button = ({
  buttonType,
  className,
  style,
  children,
  disabled,
  onClick,
  onBlur,
  loading,
  onLoadingText,
  ...rest
}: buttonProps) => {
  return (
    <button
      className={`button ${
        buttonType == "secondaryButton" ? "secondary-button" : "main-button"
      }`}
      disabled={disabled || loading}
      type="submit"
      onClick={onClick}
      onBlur={onBlur}
      {...rest}
      style={style}
    >
      {loading && (
        <FontAwesomeIcon className="fa-spin spinnerIcon" icon={faSpinner} />
      )}
      {loading && onLoadingText}
      {!loading && children}
    </button>
  );
};

export default Button;
