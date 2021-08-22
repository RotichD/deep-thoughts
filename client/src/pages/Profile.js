import React from "react";
import { Redirect, useParams } from "react-router-dom";
import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { ADD_FRIEND } from "../utils/mutations";
import PlusOneRoundedIcon from "@material-ui/icons/PlusOneRounded";
import Snackbar from "@material-ui/core/Snackbar";
import ThoughtForm from "../components/ThoughtForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
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
  },
}));


const Profile = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const { username: userParam } = useParams();
  const [addFriend] = useMutation(ADD_FRIEND);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // redirect to personal page if logged in
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  if (!user?.username) {
    return (

      <div className={classes.root}>
        <Alert severity="info" className={classes.alert}>
          <AlertTitle>Error</AlertTitle>
          <Typography variant="h5">
            You need to be logged in to see this page. Use the navigation links
            above to sign up or log in!
          </Typography>
        </Alert>
      </div>
    );
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });

      setOpen(true);

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row my-3">
        <Typography variant="h3">
          Viewing {userParam ? `${user.username}'s` : "your"} profile
        </Typography>

        {userParam && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            style={{ marginLeft: "auto" }}
          >
            Add Friend <PlusOneRoundedIcon />
          </Button>
        )}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" variant="filled">
            Successfully Added Friend!
          </Alert>
        </Snackbar>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
          />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <ThoughtForm />}</div>
    </div>
  );
};

export default Profile;
