import Panelist from "../models/Panelist.js";
import { emitVoteUpdate } from "../socket/utils.js";
import { getPercentage } from "../utils/calculationUtils.js";
import { sendResponse } from "../utils/response.js";

export const voteOnPanelist = async (req, res) => {
  try {
    const { panelistId } = req.params;
    const { voterId, voteType } = req.body;
    const activeCount = await Panelist.countDocuments({ status: "APPROVED" });
    const requiredApprovalCount = Math.ceil(activeCount * 0.75); // 75% threshold
    const panelist = await Panelist.findById(panelistId);
    const voterPanelist = await Panelist.findById(voterId).select("status");
    if (!panelist || voterPanelist.status !== "APPROVED")
      return res
        .status(404)
        .json({ message: "Panelist not found or not approved" });

    const alreadyVoted = panelist.votes.some(
      (v) => v.voter.toString() === voterId
    );
    if (alreadyVoted) return res.status(400).json({ message: "Already voted" });

    panelist.votes.push({ voter: voterId, vote: voteType });
    panelist.voteCount[voteType] += 1;

    if (panelist.voteCount.approve >= requiredApprovalCount) {
      panelist.status = "APPROVED";
    }

    const approvedPanelist = await Panelist.countDocuments({
      status: "APPROVED",
    });

    await panelist.save();

    // Emit socket event
    emitVoteUpdate(
      req.app.get("io"),
      panelist._id,
      panelist.voteCount,
      getPercentage(panelist.voteCount.approve, approvedPanelist),
      panelist.status
    );

    return sendResponse(res, true, "Voted Successfully", 200, {
      data: panelist,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
