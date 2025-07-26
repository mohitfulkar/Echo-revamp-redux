import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { baseUrl } from "../environment/environment.local";
import { io } from "socket.io-client";
const socket = io(baseUrl);

type ListenerOptions = {
  event: string;
  action: (payload: any) => any; // Redux action creator
  transformPayload?: (rawPayload: any) => any; // optional payload adapter
};

export const useSocketListener = ({
  event,
  action,
  transformPayload,
}: ListenerOptions) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handler = (rawPayload: any) => {
      const finalPayload = transformPayload
        ? transformPayload(rawPayload)
        : rawPayload;
      dispatch(action(finalPayload));
    };

    socket.on(event, handler);
    return () => {
      socket.off(event, handler);
    };
  }, [event, action, transformPayload, dispatch]);
};
