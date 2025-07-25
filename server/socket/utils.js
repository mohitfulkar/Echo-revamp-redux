// socket/helpers.js

/**
 * Emits a vote update to everyone OR to a specific room.
 * @param {object} io - Socket.IO server instance
 * @param {string} panelistId - ID of panelist being voted on
 * @param {object} voteCount - Updated vote count
 * @param {string} status - Updated panelist status
 */
export const emitVoteUpdate = (
  io,
  panelistId,
  voteCount,
  approvalPercent,
  status,
) => {
  const payload = {
    panelistId,
    voteCount,
    approvalPercent,
    status,
  };

  // Option 1: Broadcast globally
  io.emit("vote:update", payload);

  // Option 2: Broadcast only to users in specific room
  // io.to(panelistId).emit("vote:update", payload);
};
