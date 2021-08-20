import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

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

const Login = (props) => {
  

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);


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
    console.log('test')

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);

      console.log(data);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Grid container spacing={5} justify="center">
            <Grid item xs={12}>
              <Typography variant="h4">Login</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl onSubmit={handleFormSubmit} className={classes.root}>
                <TextField
                  className={classes.TextField}
                  margin="normal"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  className={classes.TextField}
                  margin="normal"
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                  required
                />
                <Button variant="contained" color="primary" type="submit" onClick={handleFormSubmit}>
                  Submit
                </Button>
              </FormControl>
            </Grid>
            {error && <div>Login failed</div>}
          </Grid>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
