import React from "react";
import PropTypes from "prop-types";
import { useField, useFormikContext, ErrorMessage } from "formik";
import Select from "react-select";
import { FormGroup } from "@material-ui/core";


/**
 * Wrapper around material-ui TextField.
 * Adds Formik functionality.
 */
export default function FormikSelect(props) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <FormGroup>
      <label htmlFor={field.name}>{props.label}</label>
      <Select
        error={meta.touched && meta.error}
        helperText={meta.error}
        {...field}
        {...props}
        onChange={object => setFieldValue(field.name, object)}
      />
      {meta.touched && meta.error && (
        <ErrorMessage>{meta.error}</ErrorMessage>
      )}
    </FormGroup>
  );
}

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
};
