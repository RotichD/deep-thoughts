import React, { useState } from "react";
import { ADD_REACTION } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Button } from '@material-ui/core';


const ReactionForm = ({ thoughtId }) => {
  const [reactionBody, setBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addReaction, { error }] = useMutation(ADD_REACTION);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addReaction({
        variables: { reactionBody, thoughtId },
      });

      setBody("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="mb-3">
      <p className="m-0">
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Reply to this thought with a reaction..."
          className="form-input col-12 col-md-9"
          onChange={handleChange}
          value={reactionBody}
          style={{ fontFamily: "Rubik" }}
        ></textarea>

        <Button color="primary" size="small" variant="contained" type="submit" onClick={handleFormSubmit} style={{ width: "20%" }}>
          Submit
        </Button>
      </form>
    </div> 
  );
};

export default ReactionForm;
