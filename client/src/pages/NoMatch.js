import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  alert: {
    width: "100%",
    margin: "5%",
  }
}));

const NoMatch = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="error" className={classes.alert}>
        <AlertTitle>Error</AlertTitle>
        <Typography variant="h5">Oops, we couldn't find that page!</Typography>
      </Alert>
    </div>
  );
};

export default NoMatch;