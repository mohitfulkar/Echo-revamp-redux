import React, { useEffect, useState } from "react";
import PanelistLayout from "../PanelistLayout";
import DoughnutChart from "../../../components/shared/DoughnutChart";
import { useDispatch, useSelector } from "react-redux";
import { getPollItems } from "../../../app/features/poll/pollSlice";
import SearchBar from "../../../components/shared/SearchBar";
import { debounce } from "lodash";
import {
  getPanelistsById,
  getPanelistSummarybyId,
} from "../../../app/features/panelist/panelistSlices";
import { getPhotoUrl } from "../../../service/imageService";

const VoteCount = () => {
  const dispatch = useDispatch();
  const { pollItems } = useSelector((state) => state.poll);
  const acceptedPolls =
    pollItems?.filter((poll) => poll.status === "accepted") || [];

  useEffect(() => {
    if (!pollItems?.length) {
      dispatch(getPollItems());
    }
  }, [dispatch, pollItems?.length]);

  const handleSearch = debounce((e) => {
    const searchValue = e.target.value.trim();
    dispatch(
      getPollItems({ search_data: searchValue, search_fields: "pollQuestion" })
    );
  }, 300);

  return (
    <PanelistLayout>
      <div className="text-center">
        <SearchBar handleSearch={handleSearch} searchOn="Poll Question" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {acceptedPolls.map((poll) => (
          <PollItem key={poll._id} poll={poll} />
        ))}
      </div>
    </PanelistLayout>
  );
};

// Separate PollItem component to handle fetching panelist data for each poll
const PollItem = ({ poll }) => {
  const dispatch = useDispatch();
  const [panelist, setPanelist] = useState(null); // Store specific panelist data

  useEffect(() => {
    const fetchPanelist = async () => {
      try {
        const response = await dispatch(
          getPanelistSummarybyId(poll.createdBy)
        ).unwrap();
        console.log(response.data);
        setPanelist(response.data); // Store the specific panelist data
      } catch (error) {
        console.error("Error fetching panelist:", error);
      }
    };

    if (poll.createdBy) {
      fetchPanelist();
    }
  }, [dispatch, poll.createdBy]);

  const labels = poll?.options?.map((option) => option.name) || [];
  const dataValues = poll?.options?.map((option) => option.voteCount) || [];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <div>
          <h3 className="text-md font-semibold mb-1">{poll.subject}</h3>
          <h3 className="text-md">{poll.pollQuestion}</h3>
        </div>
        {panelist && panelist.photo && (
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={getPhotoUrl(panelist.photo)}
            alt={panelist.fullName || "Panelist"}
          />
        )}
      </div>
      <DoughnutChart
        labels={labels}
        label="Vote Count"
        dataValues={dataValues}
      />
    </div>
  );
};

export default VoteCount;
