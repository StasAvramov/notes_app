import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  text: {
    color: theme.palette.success.main,
  },
}));

function Home() {
  const classes = useStyles();
  const user = useSelector(state => state.user.email);

  return (
    <Box className={classes.paper}>
      <Typography component="h1">
        {'Welcome, '}
        <Box component="span" className={classes.text}>
          {user}
        </Box>
      </Typography>
    </Box>
  );
}

export default Home;
