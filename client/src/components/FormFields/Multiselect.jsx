/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function FormikMultiselect() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={top100Films}
        getOptionLabel={option => option.title}
        // defaultValue={[top100Films[0]]}
        filterSelectedOptions
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="Members"
            placeholder="Favorites"
            fullWidth
          />
        )}
      />
    </div>
  );
}

const top100Films = [
  { title: "GOproiu", year: 1994 },
  { title: "Neacsu", year: 1994 },
  { title: "Robert", year: 1994 },
  { title: "Partenie", year: 1994 },
  { title: "Tudor", year: 1994 },
];
