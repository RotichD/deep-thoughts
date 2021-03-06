import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";
import { Button } from '@material-ui/core';

const ThoughtForm = () => {
  const [thoughtText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
      update(cache, { data: { addThought } }) {
        try {
          // read the cache
          const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
          // put newest thought to the front of array
          cache.writeQuery({
              query: QUERY_THOUGHTS,
              data: { thoughts: [addThought, ...thoughts] }
          });
        } catch (e) {
            console.error(e);
        }

        // update me object's cache, append new thought to end of array
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, thoughts: [...me.thoughts, addThought ] } }
        });
      }
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to DB
      await addThought({
        variables: { thoughtText },
      });

      //clear values
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? "text-error" : ""}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        
        <textarea
          placeholder="Talk to em!..."
          value={thoughtText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
          style={{ fontFamily: "Rubik" }}
        >
        </textarea>
        <Button color="primary" size="small" variant="contained" type="submit" onClick={handleFormSubmit} style={{ width: "20%" }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ThoughtForm;
