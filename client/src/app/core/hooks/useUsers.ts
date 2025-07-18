// hooks/usePanelists.ts
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getUsersByTab } from "../../modules/voter/features/userSlices";
import type { AppDispatch, RootState } from "../../store";

export const useUsers = (tab: string, params: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const itemsByKey = useSelector((state: RootState) => state.users.itemsByKey);
  const tabData = useMemo(() => itemsByKey[tab]?.data[tab], [itemsByKey, tab]);
  const paginationInfo = useMemo(
    () => itemsByKey[tab]?.data?.pagination || null,
    [itemsByKey, tab]
  );
  useEffect(() => {
    dispatch(
      getUsersByTab({
        tab,
        params: params,
      })
    );
  }, [dispatch, tab]);

  return { tabData, paginationInfo };
};
