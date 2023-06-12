/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "../styles/auth.css";
import "../styles/otpField.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import AuthCode from "react-auth-code-input";
import Button from "../components/Button";
import { useCustomMutation } from "../hooks/useCustomMutation";
import {
  IVerifyEmailRequest,
  verifyEmail as verifyEmailUser,
} from "../api/auth";

import { AxiosError } from "axios";
import * as toast from "../utils/toast";
import { getLocalStorage } from "../utils/storage";

export default function VerifyEmail() {
  const [result, setResult] = useState("");
  const handleOnChange = (res: string) => {
    setResult(res);
  };
  const nav = useNavigate();

  const { mutate: verifyEmail } = useCustomMutation<IVerifyEmailRequest, any>({
    api: verifyEmailUser,
    success: "Registered Successfully",
    error: "Error",
    onSuccess: () => {
      toast.success("Email verified.");
      nav("/login");
    },
    onError: (err) => {
      if (err instanceof AxiosError) toast.error(`error`);
    },
  });
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = getLocalStorage("email");
    if (email) {
      const data = {
        email: email,
        token: result,
      };
      verifyEmail(data);
    } else {
      toast.error("Error");
    }
  };
  return (
    <>
      <div className="form-container">
        <div className="form-header">
          <p className="form-title">Verify your email address.</p>
          <p className="form-description">
            Fill up the OTP code to start accessing the website,
          </p>
        </div>
        <div className="form-contents">
          <form className="auth-form" onSubmit={handleOnSubmit}>
            <div className="otpField">
              <AuthCode allowedCharacters="numeric" onChange={handleOnChange} />
            </div>
            <Button>Verify Email</Button>
            <div className="login-redirect">
              <p>Didn&#8217;t receive the code?</p>
              <Link to="/">
                <span>Send again</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
