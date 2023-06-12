/* eslint-disable @typescript-eslint/require-await */
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import * as toast from "../utils/toast";

interface IMutateParams<Param, ReturnType> {
  api: (param: Param) => Promise<ReturnType>;
  success?: string;
  error?: string;
  onSuccess?: (data: ReturnType) => void;
  onError?: (err: AxiosError) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCustomMutation<Param, ReturnType>({
  api,
  success,
  error,
  onSuccess,
  onError,
}: IMutateParams<Param, ReturnType>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return useMutation(async (param: Param) => api(param), {
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError: (err: AxiosError) => {
      if (onError) onError(err);
    },
  });
}
