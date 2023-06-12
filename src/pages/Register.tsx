import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import useFormInput from "../hooks/useFormInput";
import { IRegisterRequest, register as registerUser } from "../api/auth";
import { useCustomMutation } from "../hooks/useCustomMutation";
import * as toast from "../utils/toast";
import { AxiosError } from "axios";
import { setLocalStorage } from "../utils/storage";

const Register = () => {
  const nav = useNavigate();
  const input = useFormInput([
    { name: "username" },
    { name: "email" },
    { name: "password" },
    { name: "confirmPassword" },
  ]);
  const { mutate: register, isLoading } = useCustomMutation<
    IRegisterRequest,
    any
  >({
    api: registerUser,
    success: "Registered Successfully",
    error: "Error",
    onSuccess: () => {
      nav("/verify-email");
      toast.success("Email verification link has been sent to your email");
    },
    onError: (err) => {
      if (err instanceof AxiosError && err.response?.status === 500) {
        toast.error("Email already exists");
        return;
      }
      toast.error("error");
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      username: input.username.value,
      email: input.email.value,
      password: input.password.value,
      roles: ["user"],
    };
    if (input.password.value !== input.confirmPassword.value) {
      toast.error("Passwords do not match");
      return;
    }
    setLocalStorage("email", data.email);

    register(data);
  };
  return (
    <div className="form-container">
      <div className="form-header">
        <p className="form-title">You’re one step closer!</p>
        <p className="form-description">
          Fill up the form below with required data to get started.
        </p>
      </div>
      <div className="form-contents">
        <form className="auth-form" onSubmit={handleSubmit}>
          <InputField
            name="username"
            onChange={input[`username`].handleChange}
            inputType="text"
            placeholder="Username"
          />
          <InputField
            name="email"
            onChange={input[`email`].handleChange}
            inputType="email"
            placeholder="Email Address"
          />
          <InputField
            name="password"
            onChange={input[`password`].handleChange}
            inputType="password"
            placeholder="Password"
          />
          <InputField
            name="confirmPassword"
            onChange={input[`confirmPassword`].handleChange}
            inputType="password"
            placeholder="Confirm Password"
          />
          <Button>Register Now</Button>
        </form>
        <p className="login-redirect">
          Already have an account?
          <Link className="login-page-link" to="/login">
            Login here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
