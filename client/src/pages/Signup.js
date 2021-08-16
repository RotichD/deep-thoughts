import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    justifyContent: "center",
    display: "flex",
  },
  TextField: {
    width: "100%",
  },
  card: {
    width: "100%",
  },
  content: {
    width: "100%",
  },
}));

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  const classes = useStyles();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //error handling
    try {
      // executes addUser mutation and passes in the variable data from the form
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Grid container spacing={5} justify="center">
            <Grid item xs={12}>
              <Typography variant="h4">Sign Up</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl onSubmit={handleFormSubmit} className={classes.root}>
                <TextField
                  className={classes.TextField}
                  placeholder="Your username"
                  name="username"
                  type="username"
                  id="username"
                  value={formState.username}
                  onChange={handleChange}
                  required
                  margin="normal"
                />
                <TextField
                  className={classes.TextField}
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  margin="normal"
                />
                <TextField
                  className={classes.TextField}
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                  required
                  margin="normal"
                />
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </FormControl>
            </Grid>
            {error && <div>Sign up failed</div>}
          </Grid>
        </CardContent>
      </Card>
    </main>
  );
};

export default Signup;
