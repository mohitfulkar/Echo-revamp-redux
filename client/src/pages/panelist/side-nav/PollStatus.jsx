import React, { useEffect, useState } from "react";
import PanelistLayout from "../PanelistLayout";
import { MdPublish, MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import {
  getPollItems,
  updateStatus,
} from "../../../app/features/poll/pollSlice";
import Modal from "../../../components/shared/Modal";
import SearchBar from "../../../components/shared/SearchBar";

const PollStatus = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPollId, setSelectedPollId] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [poll, setPoll] = useState(null);

  const dispatch = useDispatch();
  const { pollItems } = useSelector((state) => state.poll);

  const nonRejectedPoll = pollItems.filter(
    (poll) => poll.status !== "rejected"
  );

  useEffect(() => {
    if (!pollItems || pollItems.length === 0) {
      dispatch(getPollItems());
    }
  }, [dispatch, pollItems.length]);

  const handleAction = async () => {
    if (
      !selectedPollId ||
      !["rejected", "accepted", "pending"].includes(actionType)
    )
      return;

    try {
      await dispatch(
        updateStatus({ id: selectedPollId, status: actionType })
      ).unwrap();
      dispatch(getPollItems());
    } catch (error) {
      console.error("Error updating poll:", error);
    }

    setIsVisible(false);
    setSelectedPollId(null);
  };

  const handleSearch = debounce((e) => {
    const searchValue = e.target.value.trim();
    dispatch(
      getPollItems({ search_data: searchValue, search_fields: "pollQuestion" })
    );
  }, 300);

  return (
    <PanelistLayout>
      {isVisible && (
        <Modal
          question={
            actionType === "rejected"
              ? "Do you want to drop this Poll?"
              : "Do you want to publish this Poll?"
          }
          onConfirm={handleAction}
          onCancel={() => setIsVisible(false)}
        />
      )}
      <div className="text-center">
        <SearchBar handleSearch={handleSearch} searchOn="Poll Question" />
      </div>
      <div className="m-3">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left h-12">
              <th className="w-2/6 px-4 py-2 border border-gray-300">
                Subject
              </th>
              <th className="w-2/6 px-4 py-2 border border-gray-300">
                Poll Question
              </th>
              <th className="w-1/6 px-4 py-2 border border-gray-300">
                Created By
              </th>
              <th className="w-2/6 px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {nonRejectedPoll.map((item) => (
              <tr key={item._id} className="h-12 border-b border-gray-300">
                <td className="px-4 py-2">{item.subject}</td>
                <td className="px-4 py-2">{item.pollQuestion}</td>
                <td className="px-4 py-2">{item.created_by_name}</td>
                <td className="px-4 py-2">
                  {item.status !== "accepted" && (
                    <button
                      onClick={() => {
                        setPoll(item);
                        setSelectedPollId(item._id);
                        setIsVisible(true);
                        setActionType("accepted");
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      <MdPublish />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setPoll(item);
                      setSelectedPollId(item._id);
                      setIsVisible(true);
                      setActionType("rejected");
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {nonRejectedPoll?.length === 0 && (
          <p className="text-center mt-4 text-gray-600">No polls available.</p>
        )}
      </div>
    </PanelistLayout>
  );
};

export default PollStatus;
