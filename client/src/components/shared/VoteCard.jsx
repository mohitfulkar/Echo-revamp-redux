import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../constants/style.css";
import Modal from "./Modal";
import {
  updateVoteCount,
  getPollItems,
} from "../../app/features/poll/pollSlice";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const VoteCard = ({ poll }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const { id } = useParams();
  const { success } = useSelector((state) => state.poll);

  const dispatch = useDispatch();

  const handleVote = async () => {
    if (!selectedPoll || !selectedOption) return;
    let payload = {
      userId: id,
      pollId: selectedPoll,
      option: selectedOption,
    };
    try {
      const response = await dispatch(updateVoteCount(payload)).unwrap();
      dispatch(getPollItems());

      setIsVisible(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      {isVisible && (
        <Modal
          question="Submitting a vote is irreversible. Are you sure?"
          onConfirm={handleVote}
          onCancel={() => setIsVisible(false)}
        />
      )}
      <h3 className="p mb-2">{poll.subject}</h3>
      <h3 className="text-lg font-semibold mb-2">{poll.pollQuestion}</h3>
      <div className="space-y-2">
        {poll?.options.map((option) => (
          <button
            key={option.name}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
            onClick={() => {
              setSelectedPoll(poll._id);
              setSelectedOption(option.name);
              setIsVisible(true);
            }}
          >
            {option.name} ({option.voteCount})
          </button>
        ))}
      </div>
    </div>
  );
};

export default VoteCard;
