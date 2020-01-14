import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";

/**
 * Wrapper around material-ui TextField.
 * Adds Formik functionality.
 */
export default function FormikControlLabel(props) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  const [field, meta] = useField(props);

  console.log(field)
  console.log(props)

  return (
    <FormControlLabel
      control={<Checkbox name="remember" color="primary" />}
      error={!!(meta.touched && meta.error)} // must be boolean
      // helperText={meta.error}
      {...field}
      {...props}
    />
  );
}

// FormControlLabel.propTypes = {
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
// };
