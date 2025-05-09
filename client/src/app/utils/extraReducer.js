export const handleAsyncAction = (
  builder,
  action,
  stateKey,
  tokenState = null
) => {
  builder
    .addCase(action.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(action.fulfilled, (state, action) => {
      state.loading = false;
      state[stateKey] = action.payload; // Dynamically update state
      state.success = true;

      if (tokenState) {
        state[tokenState] = action.payload.token; // Set additional state
      }
    })
    .addCase(action.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
    });
};
