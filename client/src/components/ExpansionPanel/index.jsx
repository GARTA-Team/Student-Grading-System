import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { t } from "react-i18nify";

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

  details: {
    alignItems: 'center',
  },

  column: {
    flexBasis: '20%',
    flexDirection: 'column',
  },

  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 5),
  },

}));

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  console.log(props.team);

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === props.team.id} onChange={handleChange(props.team.id)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{props.team.name}</Typography>
          </div>
        </ExpansionPanelSummary>
        <p>Nume</p>
        <ExpansionPanelDetails className={classes.details}>
          {props.team.members.map(member => {
            return (
              <Chip label={member.username} />
            )
          })}
          <div className={clsx(classes.column, classes.helper)}>
            {props.team.projects.map((project) => {
              return (
                <Chip
                  label={project.name}
                  component="a"
                  href={`/projects/${project.id}`}
                  clickable />
              )
            })}
          </div>
        </ExpansionPanelDetails>
        <Divider />
      </ExpansionPanel>
    </div>
  );
}
