import React from "react";
import PropTypes from "prop-types";
import { useField, useFormikContext, ErrorMessage } from "formik";
import Select from "react-select";
import FormGroup from "@material-ui/core/FormGroup";

/**
 * Wrapper around material-ui TextField.
 * Adds Formik functionality.
 */
export default function FormikSelect(props) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  console.log(meta.touched && meta.error)

  return (
    <Select
      {...field}
      {...props}
      onChange={object => setFieldValue(field.name, object)}
      styles={{
        control: provided => ({
          ...provided,
          borderColor: meta.touched && meta.error ? "red" : provided.borderColor,
        }),
      }}
    />
  );
}

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
};
