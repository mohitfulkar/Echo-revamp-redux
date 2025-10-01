import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { io } from "socket.io-client";
import { environment } from "../environment/environment.local";
const socket = io(environment.baseUrl);

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
