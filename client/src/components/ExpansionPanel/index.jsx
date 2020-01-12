import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    alignItems: 'right',
  },
  // icon: {
  //   verticalAlign: 'bottom',
  //   height: 20,
  //   width: 20,
  // },
  details: {
    alignItems: 'center',
  },
  // description: {
  //   alignItems: 'right',
  // },
  column: {
    flexBasis: '20%',
    flexDirection : 'column',
  },
  // column2: {
  //   alignItems: 'right',
  //   flexDirection : 'row',
  // },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  // link: {
  //   color: theme.palette.primary.main,
  //   textDecoration: 'none',
  //   '&:hover': {
  //     textDecoration: 'underline',
  //   },
  // },
}));

export default function DetailedExpansionPanel() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Team name</Typography>
          </div>
          <div className={classes.description}>
            <Typography className={classes.secondaryHeading}>Basic description of team ... idk</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <Chip label="GOproiu"  />
            <Chip label="Tudor"  />
            <Chip label="Robert"  />
            <Chip label="Neacsu"  />
            <Chip label="Partenie" />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
          <div className={classes.column2}>
            <Chip label="Project1"  />
            <Chip label="Project2"  />
            <Chip label="Project3"  />
            <Chip label="Project4"  />
          </div>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        {/* <ExpansionPanelActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </ExpansionPanelActions> */}
      </ExpansionPanel>
    </div>
  );
}
