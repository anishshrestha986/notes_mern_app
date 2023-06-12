import "../styles/auth.css";
import { useScrollBlock } from "../hooks/useScrollBlock";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import useFormInput from "../hooks/useFormInput";
import { LocationWithNav } from "../types/interfaces";
import { ILoginRequest, login as loginUser } from "../api/auth";
import { ILoginResponse } from "../types/interfaces/api/auth.interface";
import { AxiosError } from "axios";
import * as toast from "../utils/toast";
import { useCustomMutation } from "../hooks/useCustomMutation";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const Login = () => {
  const nav = useNavigate();
  const { state } = useLocation() as LocationWithNav;
  const { login: loginDispatch, isAuthenticated } = useAuth();
  const { mutate: login } = useCustomMutation<ILoginRequest, ILoginResponse>({
    api: loginUser,
    onSuccess: (data) => {
      loginDispatch(data);
      nav(state?.path || "/mynotes");
    },
    onError: (err) => {
      if (err instanceof AxiosError && err.response?.status === 401) {
        toast.error("Credentials did not match.");
        return;
      }
      toast.error(" An error occured");
    },
  });
  const input = useFormInput([{ name: "email" }, { name: "password" }]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: input.email.value,
      password: input.password.value,
    };
    login(data);
  };
  useEffect(() => {
    if (isAuthenticated) {
      nav(state?.path || "/mynotes");
    }
  }, [isAuthenticated]);
  const { blockScroll } = useScrollBlock();
  blockScroll();
  return (
    <>
      <div className="form-container">
        <div className="auth-form-wrapper">
          <div className="form-header">
            <p className="form-title">Welcome back!</p>
            <p className="form-description">
              Enter your credentials below to login to our dashboard.
            </p>
          </div>
          <div className="form-contents">
            <form className="auth-form" onSubmit={handleSubmit}>
              <InputField
                inputType="email"
                name="email"
                onChange={input[`email`].handleChange}
                placeholder="Email Address"
              />
              <InputField
                inputType="password"
                name="password"
                placeholder="Password"
                onChange={input[`password`].handleChange}
              />
              <Button>Login to dashboard</Button>
            </form>
            <p className="signup-redirect">
              Don't have an account?
              <Link className="signup-page-link" to="/register">
                Signup here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
