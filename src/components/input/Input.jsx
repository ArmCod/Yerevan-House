import React from "react";
import { ErrorMessage, useField } from "formik";
const Input = (props) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <input
        className={`input ${meta.touched && meta.error && "is-invalid"}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};

export default Input;
