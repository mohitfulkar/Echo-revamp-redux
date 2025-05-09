import Poll from "../model/Poll.js";
import "dotenv/config"; // Load environment variables from .env file
import { commanService } from "../services/commanService.js";
import { User } from "../model/User.js";

export const getPollItems = async (req, res) => {
  try {
    // console.log("query", query);
    const items = await commanService.getAll(Poll, req.query);

    res.status(200).json({
      success: true,
      ...items,
    });
  } catch (err) {
    console.error("Error fetching items:", err);
    // Return an error response in case of failure
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching items.",
      error: err.message,
    });
  }
};

export const getPollById = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findById(id);
    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Poll fetched successfully",
      data: poll,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch poll",
      error: error.message,
    });
  }
};
export const getPollCount = async (req, res) => {
  try {
    const acceptedCount = await commanService.getCount(Poll, {
      status: "accepted",
    });
    console.log("acceptedCount", acceptedCount);
    const rejectedCount = await commanService.getCount(Poll, {
      status: "rejected",
    });
    const pendingCount = await commanService.getCount(Poll, {
      status: "pending",
    });
    const totalCount = await commanService.getCount(Poll, {}); // Get total count

    res.status(200).json({
      success: true,
      message: "Poll count fetched successfully",
      data: {
        accepted: acceptedCount.count,
        rejected: rejectedCount.count,
        pending: pendingCount.count,
      },
    });
  } catch (error) {
    console.error("Error fetching poll count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch poll",
      error: error.message,
    });
  }
};

export const deletePollById = async (req, res) => {
  try {
    let { id } = req.params; //

    const response = await commanService.deleteById(Poll, id);
    res.status(201).json(response); // Send the response back to the client
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create poll",
      error: error.message,
    });
  }
};
export const deletePolls = async (req, res) => {
  try {
    const response = await commanService.deleteById(Poll);
    res.status(201).json(response); // Send the response back to the client
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create poll",
      error: error.message,
    });
  }
};
export const createPoll = async (req, res) => {
  try {
    let payload = req.body; //
    const response = await commanService.create(Poll, payload);
    res.status(201).json(response); // Send the response back to the client
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create poll",
      error: error.message,
    });
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body; // Extract `id` and `status` from request body
    const { id } = req.params; // Extract `id` and `status` from request body

    // Check if `id` and `status` are provided
    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message: "Poll ID and status are required",
      });
    }

    // Validate that `status` is one of the allowed values
    const allowedStatuses = ["pending", "accepted", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${allowedStatuses.join(
          ", "
        )}`,
      });
    }

    // Check if poll exists
    const existingPoll = await Poll.findById(id);
    if (!existingPoll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }

    // Update poll using the common service
    const updatedPoll = await commanService.update(Poll, id, { status });

    return res.status(200).json({
      success: true,
      message: "Poll status updated successfully",
      data: updatedPoll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update poll",
      error: error.message,
    });
  }
};

export const updateVoteCount = async (req, res) => {
  try {
    const { option, pollId } = req.body; // Option name (e.g., "yes")
    const { userId } = req.params; // Poll ID and User ID

    if (!option || !pollId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Poll ID, User ID, and option are required",
      });
    }

    // Fetch the poll
    const existingPoll = await Poll.findById(pollId);
    if (!existingPoll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }

    // Fetch the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user has already voted for this poll
    if (user.votedPolls.includes(pollId)) {
      return res.status(400).json({
        success: false,
        message: "You have already voted in this poll",
      });
    }

    // Update the vote count for the selected option
    const optionToUpdate = existingPoll.options.find(
      (item) => item.name === option
    );
    if (!optionToUpdate) {
      return res.status(400).json({
        success: false,
        message: "Invalid option selected",
      });
    }
    // console.log("updatedOptions", updatedOptions);
    optionToUpdate.voteCount += 1;

    // Save the updated poll document
    await existingPoll.save();

    // Add the poll ID to the user's votedPolls array
    user.votedPolls.push(pollId);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Vote recorded successfully",
      updatedPoll: existingPoll, // Sending updated poll as response
    });
  } catch (error) {
    console.error("Error updating vote count:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the vote count.",
    });
  }
};
