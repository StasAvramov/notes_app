import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotesIcon from '@material-ui/icons/Notes';

import { useAuth } from '../../hooks';
import { ROUTES } from '../../constants/routes';

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(0, 'auto'),
    maxWidth: theme.breakpoints.values.md,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function Header() {
  const classes = useStyles();
  const { onLogout } = useAuth();
  // function logout() {
  //   onLogout();
  // }

  return (
    <AppBar position="sticky" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <Button
          component={Link}
          to={ROUTES.home}
          color="inherit"
          startIcon={<NotesIcon />}
        >
          My Notes
        </Button>
        <Button onClick={() => onLogout()} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
