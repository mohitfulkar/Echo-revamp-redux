import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPollById,
  getPollItems,
} from "../../app/features/poll/pollSlice.js";
import { toast } from "react-toastify";

const Demo = () => {
  const pollId = "671c8713375967e31734b23c";
  const dispatch = useDispatch();
  const { pollItems, pollItem, loading, error, success } = useSelector(
    (state) => state.poll
  );
  console.log("pollItems", pollItems);
  useEffect(() => {
    dispatch(getPollItems()); // Fetch the poll by ID
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        {pollItem ? (
          <div>
            <h1>{pollItem.question}</h1>
            <ul>
              {pollItem.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No poll found.</p>
        )}
      </div>
    </>
  );
};

export default Demo;
