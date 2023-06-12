type FieldArgs = {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialState?: any;
  };
  
  type useInputReturn = {
    value: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setValue: React.Dispatch<React.SetStateAction<any>>;
  };
  
  type useFormInputReturn = {
    [key: FieldArgs['name']]: useInputReturn;
  };
  
  export type { FieldArgs, useInputReturn, useFormInputReturn };