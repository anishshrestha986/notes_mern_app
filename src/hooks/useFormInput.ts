import { useState } from 'react';
import { FieldArgs, useFormInputReturn, useInputReturn } from '../types/types/useFormInput.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useInput(initialState: any): useInputReturn {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [value, setValue] = useState(initialState ?? '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { value, handleChange, setValue };
}

const generateFields = (fields: Array<FieldArgs>) => {
  const fieldObj: useFormInputReturn = {};

  fields.forEach((field) => {
    fieldObj[`${field.name}`] = useInput(field?.initialState);
  });

  return fieldObj;
};

export default function useFormInput(fields: Array<FieldArgs>) {
  return generateFields(fields);
}