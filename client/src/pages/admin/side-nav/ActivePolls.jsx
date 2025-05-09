import React, { useEffect, useState, useMemo } from "react";
import moment from "moment";
import AdminLayout from "../AdminLayout";
import DoughnutChart from "../../../components/shared/DoughnutChart";
import { useDispatch, useSelector } from "react-redux";
import {
  getPollCount,
  getPollItems,
} from "../../../app/features/poll/pollSlice";
import { getPanelists } from "../../../app/features/panelist/panelistSlices";
import LineChart from "../../../components/shared/LineChart";

const ActivePolls = () => {
  const dispatch = useDispatch();
  const { count, success, pollItems } = useSelector((state) => state.poll);
  const { panelists } = useSelector((state) => state.panelist);

  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);

  // Generate last 6 months labels
  const last6Months = useMemo(() => {
    return [...Array(6)]
      .map((_, i) => moment().subtract(i, "months").format("MMM YYYY"))
      .reverse();
  }, []);

  // Filter and count polls based on timestamps
  const pollCountByMonth = useMemo(() => {
    if (!pollItems) return Array(6).fill(0);

    const pollCounts = last6Months.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {});

    pollItems.forEach((poll) => {
      const pollMonth = moment(poll.created_at).format("MMM YYYY");
      if (pollCounts[pollMonth] !== undefined) {
        pollCounts[pollMonth] += 1;
      }
    });

    return Object.values(pollCounts);
  }, [pollItems, last6Months]);

  // Compute panelist poll counts using useMemo
  const panelistPollData = useMemo(() => {
    if (!pollItems || !panelists?.data) return { names: [], counts: [] };

    return panelists.data.reduce(
      (acc, panelist) => {
        const count = pollItems.filter(
          (poll) => poll.created_by_name === panelist.fullName
        ).length;
        acc.names.push(panelist.fullName);
        acc.counts.push(count);
        return acc;
      },
      { names: [], counts: [] }
    );
  }, [pollItems, panelists]);

  // Categorize polls by status
  const activePolls = pollItems.filter((poll) => poll.status === "accepted");
  const rejectedPolls = pollItems.filter((poll) => poll.status === "rejected");
  const pendingPolls = pollItems.filter((poll) => poll.status === "pending");

  // Fetch data on mount
  useEffect(() => {
    dispatch(getPollCount());
    dispatch(getPanelists());
    dispatch(getPollItems());
  }, [dispatch]);

  // Update state when count data is available
  useEffect(() => {
    if (success && count?.data) {
      setKeys(Object.keys(count.data));
      setValues(Object.values(count.data));
    }
  }, [success, count]);

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between gap-6 p-4">
          {/* Left Section - Doughnut Charts */}
          <div className="w-1/2 flex flex-row gap-6 h-full">
            {/* Poll count based on status */}
            <div className="header poll-count-status text-center bg-blue-300 rounded-lg p-4 shadow-md">
              <label className="block mb-2 font-semibold">
                Poll Counts by Status
              </label>
              <DoughnutChart
                labels={keys}
                dataValues={values}
                label="Poll Count"
              />
            </div>

            {/* Poll count based on panelist */}
            <div className="header poll-count-panelist text-center bg-blue-300 rounded-lg p-4 shadow-md">
              <label className="block mb-2 font-semibold">
                No. of Poll Created by a Panelist
              </label>
              <DoughnutChart
                labels={panelistPollData.names}
                dataValues={panelistPollData.counts}
                label="Poll Created"
              />
            </div>
          </div>
          <div className="h-84 mt-6 text-center w-1/2">
            <LineChart value={pollCountByMonth} label="Polls Created" />
          </div>
          {/* Right Section - Poll Table */}
          
        </div>
        <div className="w-1/2 bg-blue-200 rounded-lg shadow-md max-h-80 overflow-y-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-300">
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Status
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Poll Question
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...activePolls, ...pendingPolls, ...rejectedPolls].map(
                  (poll, index) => (
                    <tr key={index} className="border border-gray-300">
                      <td className="px-4 py-2">{poll.status}</td>
                      <td className="px-4 py-2">{poll.pollQuestion}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

        {/* Line Chart for Last 6 Months Polls */}
      </div>
    </AdminLayout>
  );
};

export default ActivePolls;
