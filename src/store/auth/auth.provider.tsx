/* eslint-disable comma-dangle */
import { useMemo, useReducer } from "react";
import { AxiosError } from "axios";
import { getMe as getUser } from "../../api/auth";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../../utils/storage";
import * as toast from "../../utils/toast";
import authReducer from "./auth.reducer";
import { AuthActionType } from "./auth.actions";
import AuthState, { AUTH_STATE, IAuthContextProps } from "./auth.state";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(authReducer, AUTH_STATE);

  const value = useMemo<IAuthContextProps>(
    () => ({
      ...state,
      login: (data) => {
        const { email, _id: id, username } = data.user;
        const { access_token: accessToken } = data;
        setLocalStorage("access_token", accessToken);
        toast.success(`Welcome ${username}!`);
        dispatch({
          type: AuthActionType.LOGIN,
          payload: {
            email,
            username,
            accessToken,
            id,
          },
        });
      },
      logout: () => {
        dispatch({ type: AuthActionType.LOGOUT });
        removeLocalStorage("access_token");
      },
      checkLogin: () => {
        const accessToken = getLocalStorage("access_token");
        if (accessToken) {
          dispatch({ type: AuthActionType.AUTHENTICATED });
          getUser()
            .then((data) => {
              const { email, _id: id, username } = data;
              toast.success(`Welcome Back ${username}!`);
              dispatch({
                type: AuthActionType.LOGIN,
                payload: {
                  email,
                  username,
                  accessToken,
                  id,
                },
              });
            })
            .catch((err: AxiosError) => {
              if (
                !(err instanceof AxiosError) ||
                !(err.response?.status === 401)
              )
                throw new Error(err.message);
              dispatch({
                type: AuthActionType.LOGOUT,
              });
              removeLocalStorage("access_token");
            });
        }
      },
    }),
    [state]
  );

  return <AuthState.Provider value={value}>{children}</AuthState.Provider>;
}
