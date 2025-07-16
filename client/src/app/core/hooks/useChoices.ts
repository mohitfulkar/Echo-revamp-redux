import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../store";
import { fetchChoices } from "../features/choiceSlices";

export const useChoices = (parentKey: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector(
    (state: RootState) => state.choices.choices[parentKey] || []
  );

  console.log("items", items);

  const loading = useSelector((state: RootState) => state.choices.loading);

  useEffect(() => {
    // Only fetch if not already loaded
    if (!items || items.length === 0) {
      dispatch(fetchChoices({ parentKey: parentKey }));
    }
  }, [dispatch, parentKey]);

  return { items, loading };
};
