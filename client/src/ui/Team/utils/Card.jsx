import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: green[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditTask = () => {
    //to do ... add new tasks 
  };
  
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} color="primary">
            G
          </Avatar>
        }
        title="Added a new task !"
        subheader= "20/12/2019"
      />
      <CardMedia
        className={classes.media}
        image="https://mpng.pngfly.com/20180821/uxs/kisspng-product-design-logo-brand-trademark-reporting-tool-for-javascript-and-html5-component-5b7c7899e0f971.9841989015348839939215.jpg"
        title="Tasks"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Details about the task ...............
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="edit task" >
            <EditIcon />
        </IconButton>
        <IconButton 
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Task:</Typography>
          <Typography paragraph>
            Try to make something good..... using react 
          </Typography>
          <Typography paragraph>
            This is not all you should do, so please use mysql
          </Typography>
          <Typography paragraph>
            Nice try, don't forget about the node
          </Typography>
          <Typography>
            Implement some mui there.
          </Typography>
          <br></br>
          <IconButton aria-label="save edits" >
            <SaveAltIcon />
          </IconButton>
        </CardContent>
      </Collapse>
    </Card>
  );
}