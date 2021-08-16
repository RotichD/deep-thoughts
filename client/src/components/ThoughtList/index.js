import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import Badge from "@material-ui/core/Badge";
import FormatQuoteRoundedIcon from "@material-ui/icons/FormatQuoteRounded";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: "2rem",
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
});

const ThoughtList = ({ thoughts, title }) => {
  const classes = useStyles();

  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <Card key={thought._id} className={classes.root}>
            <CardContent>
              <Typography className={classes.title}>
                <Link
                  to={`/profile/${thought.username}`}
                  style={{ fontWeight: 700 }}
                  className="text-light"
                >
                  <Avatar className="mb-2">{thought.username && thought.username.charAt(0).toUpperCase()}</Avatar>
                  {thought.username}
                </Link>{" "}
                posted on {thought.createdAt}
              </Typography>
              <Link to={`/thought/${thought._id}`}>
                <Typography className={classes.text}>
                  <FormatQuoteRoundedIcon
                    style={{ transform: "scaleX(-1)" }}
                    fontSize="small"
                  />
                  {thought.thoughtText}
                  <FormatQuoteRoundedIcon fontSize="small" />
                </Typography>
              </Link>
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                size="small"
                variant="contained"
                component={Link}
                to={`/thought/${thought._id}`}
                style={{ color: "white" }}
              >
                <Badge badgeContent={thought.reactionCount} color="secondary">
                  {thought.reactionCount > 0 ? "Replies" : "Reply"}{" "}
                  <ForumRoundedIcon style={{ marginLeft: "0.5rem" }} />
                </Badge>
              </Button>
            </CardActions>
          </Card>
        ))}
    </div>
  );
};

export default ThoughtList;
