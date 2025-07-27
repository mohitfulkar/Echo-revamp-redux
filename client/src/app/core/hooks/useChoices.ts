import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useEffect, useMemo } from "react";
import type { AppDispatch, RootState } from "../../store";
import { fetchChoices } from "../features/choiceSlices";

export const useChoices = (parentKey: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector(
    (state: RootState) => state.choices.choices[parentKey],
    shallowEqual
  );

  const loading = useSelector((state: RootState) => state.choices.loading);

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchChoices({ parentKey }));
    }
  }, [dispatch, parentKey]);

  // ✅ Memoize the returned object to prevent new reference every time
  return useMemo(
    () => ({
      items: items || [],
      loading,
    }),
    [items, loading]
  );
};
