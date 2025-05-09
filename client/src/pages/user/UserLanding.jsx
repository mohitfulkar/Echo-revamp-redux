import React, { useEffect, useState } from "react";
import "../../constants/style.css";
import VoteCard from "../../components/shared/VoteCard";
import UserLayout from "./UserLayout";
import SearchBar from "../../components/shared/SearchBar";
import { getPollItems } from "../../app/features/poll/pollSlice";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

const UserLanding = () => {
  const dispatch = useDispatch();
  const [acceptedPoll, setAcceptedPoll] = useState([]); // Fix: Initialize with an array
  const { pollItems } = useSelector((state) => state.poll);

  useEffect(() => {
    if (!pollItems?.length) {
      dispatch(getPollItems());
    }
  }, [dispatch, pollItems?.length]);

  // Fix: Move filtering logic inside useEffect
  useEffect(() => {
    if (pollItems?.length > 0) {
      const filteredPolls = pollItems.filter(
        (item) => item.status === "accepted"
      );
      setAcceptedPoll(filteredPolls);
    }
  }, [pollItems]);

  const handleSearch = debounce((e) => {
    const searchValue = e.target.value.trim();
    dispatch(
      getPollItems({ search_data: searchValue, search_fields: "pollQuestion" })
    );
  }, 300);
  return (
    <UserLayout>
      <div className="text-center">
        <SearchBar handleSearch={handleSearch} searchOn="Poll Question" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {acceptedPoll.map((poll) => (
          <VoteCard key={poll._id} poll={poll} />
        ))}
      </div>
    </UserLayout>
  );
};

export default UserLanding;
