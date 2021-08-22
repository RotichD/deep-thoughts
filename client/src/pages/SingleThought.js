import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHT } from "../utils/queries";
import ReactionList from "../components/ReactionList";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormatQuoteRoundedIcon from "@material-ui/icons/FormatQuoteRounded";
import Avatar from "@material-ui/core/Avatar";
import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: "2rem",
    marginTop: "2rem",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
  },
  text: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
  load: {
    justifyContent: "center",
    padding: "2rem",
    alignItems: "center"
  }
});

const SingleThought = (props) => {
  const classes = useStyles();

  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div className={classes.load}><CircularProgress /></div>;
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title}>
            <Link
              to={`/profile/${thought.username}`}
              style={{ fontWeight: 700 }}
              className="text-light"
            >
              <Avatar className="mb-2">
                {thought.username && thought.username.charAt(0).toUpperCase()}
              </Avatar>
              {thought.username}
            </Link>{" "}
            posted on {thought.createdAt}
          </Typography>
          <Typography className={classes.text}>
            <FormatQuoteRoundedIcon
              style={{ transform: "scaleX(-1)" }}
              fontSize="small"
            />
            {thought.thoughtText}
            <FormatQuoteRoundedIcon fontSize="small" />
          </Typography>
        </CardContent>
      </Card>

      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}
      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    </>
  );
};

export default SingleThought;
