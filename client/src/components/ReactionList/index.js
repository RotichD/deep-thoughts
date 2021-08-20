import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import FormatQuoteRoundedIcon from "@material-ui/icons/FormatQuoteRounded";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: "2rem",
    marginTop: "2rem",
  },
  root2: {
    minWidth: 275,
    marginBottom: "2rem",
    marginTop: "2rem",
    backgroundColor: '#fca311'
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 26,
  },
  text: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

const ReactionList = ({ reactions }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title}>Reactions</Typography>
          <Card className={classes.root2}>
            <CardContent>
              {reactions &&
                reactions.map((reaction) => (
                  <Typography className={classes.text} key={reaction._id}>
                    <FormatQuoteRoundedIcon
                      style={{ transform: "scaleX(-1)" }}
                      fontSize="small"
                    />
                    {reaction.reactionBody}
                    <FormatQuoteRoundedIcon fontSize="small" />
                    posted by {"  "}
                    <Button
                      color="primary"
                      size="small"
                      variant="contained"
                      component={Link}
                      to={`/profile/${reaction.username}`}
                      style={{ color: "white" }}
                    >
                      {reaction.username}
                    </Button>
                    {"  "} on {reaction.createdAt}
                  </Typography>
                ))}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
};

export default ReactionList;
