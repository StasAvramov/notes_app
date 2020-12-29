import { React, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../../hooks';

import Category from '../Category';
import AddIcon from '@material-ui/icons/Add';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Notes from '../Notes';
import { ROUTES } from '../../constants/routes';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'nowrap',
    boxShadow: theme.shadows[15],
    paddingTop: theme.spacing(3),
    minHeight: '100vh',
  },
  button: {
    position: 'fixed',
    bottom: theme.spacing(0),
    width: '100%',
    maxWidth: theme.breakpoints.values.md,
    margin: theme.spacing(0, 'auto'),
    borderRadius: theme.spacing(0),
    padding: theme.spacing(2, 4.75),
    [theme.breakpoints.up('md')]: {
      position: 'static',
      maxWidth: '450px',
    },
  },
}));

const LinkBehavior = forwardRef((props, ref) => (
  <Link ref={ref} to={ROUTES.add} {...props} />
));

export default function Home() {
  const classes = useStyles();
  const { notes, getNotes } = useNotes();

  useEffect(() => {
    if (!notes) {
      getNotes();
    }
  }, [notes, getNotes]);

  return (
    <>
      {/* <Header /> */}
      {/* <Container component="main" maxWidth="md" className={classes.container}> */}
      <Category />
      <Notes />
      <Button
        component={LinkBehavior}
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<AddIcon fontSize="large" />}
      >
        Add note
      </Button>
      {/* </Container> */}
    </>
  );
}
