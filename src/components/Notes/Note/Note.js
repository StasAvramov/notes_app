import { React, useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../../../hooks';

import {
  Collapse,
  CardHeader,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Typography,
  Chip,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';

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

const ButtonAsLink = forwardRef((props, ref) => <Link ref={ref} {...props} />);

export default function Note({ note }) {
  const classes = useStyles();
  const { onDeleteNote } = useNotes();
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
          <Button
            onClick={() => onDeleteNote(note.id)}
            variant="contained"
            color="primary"
            size="large"
          >
            Delete
          </Button>
          <Button
            component={ButtonAsLink}
            variant="contained"
            color="primary"
            size="large"
            to={`/note/edit/${note.id}`}
          >
            Edit
          </Button>
          <Button
            component={ButtonAsLink}
            variant="contained"
            color="primary"
            size="large"
            to={`/note/${note.id}`}
          >
            View
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}
