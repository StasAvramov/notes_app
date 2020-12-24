import { React, useState } from 'react';

import {
  Collapse,
  CardHeader,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Typography,
  Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  ExpandMore,
  DeleteForever,
  Edit,
  Fullscreen,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    boxShadow: theme.shadows[2],
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '450px',
    },
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
  },
  category: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
  description: {
    textAlign: 'start',
    textIndent: '1rem',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  actions: {
    justifyContent: 'space-evenly',
  },
}));

export default function Note({ note }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card} component="li">
      <Chip
        aria-label="category"
        label={note.category}
        color="primary"
        className={classes.category}
      />
      <CardHeader
        action={
          <IconButton
            className={
              expanded
                ? `${classes.expand} ${classes.expandOpen}`
                : classes.expand
            }
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore />
          </IconButton>
        }
        title={note.title}
        subheader={`Created: ${note.createdAt}`}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography className={classes.description}>
            {note.description}
          </Typography>
        </CardContent>

        <CardActions disableSpacing className={classes.actions}>
          <IconButton aria-label="delete note">
            <DeleteForever color="primary" />
          </IconButton>
          <IconButton aria-label="edit note">
            <Edit color="primary" />
          </IconButton>
          <IconButton aria-label="full view note">
            <Fullscreen color="primary" />
          </IconButton>
        </CardActions>
      </Collapse>
    </Card>
  );
}
