/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AxiosResponse } from "axios";
import { METHODS } from "../types/enums/axios.enum";
import {
  ILoginResponse,
  IUserResponse,
} from "../types/interfaces/api/auth.interface";
import createApi from "../utils/axios";

const userApi = createApi("/auth");

export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
export interface IVerifyEmailRequest {
  email: string;
  token: string;
}

export const register = async (registerBody: IRegisterRequest) => {
  await userApi({
    url: "/register",
    method: METHODS.POST,
    data: registerBody,
  });
};
export const verifyEmail = async (verifyEmailBody: IVerifyEmailRequest) => {
  await userApi({
    url: "/verify-email",
    method: METHODS.POST,
    data: verifyEmailBody,
  });
};
export const login = async (
  loginBody: ILoginRequest
): Promise<ILoginResponse> => {
  const { data } = (await userApi({
    url: "/login",
    method: METHODS.POST,
    data: loginBody,
  })) as AxiosResponse<ILoginResponse>;

  return data;
};

export const getMe = async (): Promise<IUserResponse> => {
  const { data } = (await userApi({
    url: "/me",
    method: METHODS.GET,
  })) as AxiosResponse<IUserResponse>;

  return data;
};
