import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';

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

import { useNotes } from '../../../hooks';
import { ROUTES } from '../../../constants/routes';
import { NoteType } from '../../../types/main';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    boxShadow: theme.shadows[2],
    width: '100%',
    maxWidth: '450px',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '450px',
    },
  },
  header: {
    maxWidth: '450px',
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

type Props = { note: NoteType };

const Note: FC<Props> = ({ note }) => {
  const classes = useStyles();
  const { onDeleteNote } = useNotes();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteNoteClick = () => {
    onDeleteNote(note.id);
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
        // classes={{content:classes.content}}
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
        subheader={
          note.updatedAt
            ? `Updated: ${note.updatedAt}`
            : `Created: ${note.createdAt}`
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography className={classes.description}>
            {note.description}
          </Typography>
        </CardContent>

        <CardActions disableSpacing className={classes.actions}>
          <Button
            component={Link}
            variant="contained"
            color="primary"
            size="large"
            to={ROUTES.dynamic.edit(note.id)}
          >
            Edit
          </Button>
          <Button
            component={Link}
            variant="contained"
            color="primary"
            size="large"
            to={ROUTES.dynamic.details(note.id)}
          >
            View
          </Button>
          <Button
            onClick={handleDeleteNoteClick}
            variant="contained"
            color="secondary"
            size="large"
          >
            Delete
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
};

export default Note;
