import React from 'react';
import { useAuth } from '../../hooks';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotesIcon from '@material-ui/icons/Notes';

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
  const history = useHistory();
  function logout() {
    onLogout();
  }

  function onClickLogo() {
    history.replace('/notes');
  }

  return (
    <AppBar position="sticky" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <Button color="inherit" onClick={onClickLogo} startIcon={<NotesIcon />}>
          My Notes
        </Button>
        <Button onClick={logout} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
