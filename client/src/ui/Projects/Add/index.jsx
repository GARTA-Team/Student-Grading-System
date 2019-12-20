import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { DateTimePicker } from "@material-ui/pickers";
import Select from "react-select";


const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1em",
  }
};

class AddProject extends Component {
  state = {
    data: {
      deliverables: [],
    },
    isAdding: false,
  }

  handleAddDeliverable = () => this.setState({ isAdding: true })

  render() {
    const { deliverables = [] } = this.state;

    return (
      <div>
        {/* Project data */}
        <Paper>
          <p>Add TODO</p>

          <form>
            <TextField label="Project Name TODO" variant="outlined" />
            {/* TODO make summary a big text field */}
            <TextField label="Project Summary TODO" variant="outlined" />

            <Select
              defaultValue={1}
              name="color"
              options={[1, 2, 3]}
            />

          </form>
        </Paper>

        {/* Project deliverables */}
        <Paper>
          <p>deliverables TODO</p>

          {deliverables.map((deliverable) => {

            return (
              <>
                <TextField label="Name TODO" variant="outlined" />
                <TextField label="Description TODO" variant="outlined" />

                <DateTimePicker
                  label="Deadline TODO"
                  inputVariant="outlined"
                // value={selectedDate}
                // onChange={handleDateChange}
                />

                <TextField label="Deliverable weight TODO" variant="outlined" />
              </>
            );
          })}

          <Button onClick={this.handleAddDeliverable}>Add deliverable TODO</Button>
        </Paper>

      </div>
    );
  }
}

export default withStyles(styles)(AddProject);
