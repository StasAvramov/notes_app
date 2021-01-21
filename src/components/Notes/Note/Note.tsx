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

import { ExpandMore } from '@material-ui/icons';

import { useNotes } from '../../../hooks';
import { ROUTES } from '../../../constants/routes';
import { NoteType } from '../../../types/main';

type Props = { note: NoteType };

const Note: FC<Props> = ({ note }) => {
  const { onDeleteNote } = useNotes();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteNoteClick = () => {
    onDeleteNote(note.id);
  };

  return (
    <Card
      // className={classes.note}
      component="li"
    >
      <div
      // className={classes.top}
      >
        <Chip
          aria-label="category"
          label={note.category}
          color="primary"
          // className={classes.category}
        />
        <IconButton
          // className={
          //   expanded
          //     ? `${classes.expand} ${classes.expandOpen}`
          //     : classes.expand
          // }
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </div>
      <CardHeader
        // className={classes.header}
        title={note.title}
        subheader={
          note.updatedAt
            ? `Updated: ${note.updatedAt}`
            : `Created: ${note.createdAt}`
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
          // className={classes.description}
          >
            {note.description}
          </Typography>
        </CardContent>

        <CardActions
          disableSpacing
          // className={classes.actions}
        >
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
