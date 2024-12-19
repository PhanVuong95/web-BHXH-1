import { useEffect, useRef, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

type Props = {
  namespace: string;
  handleMessage: (message: any) => void;
};

const useSignalR = (props: Props) => {
  const connectionRef = useRef<HubConnection>();

  const [connected, setConnected] = useState(false);
  const [clientId, setClientId] = useState<string | undefined>();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`https://zalo.dion.vn/login-portal`, {
        withCredentials: true,
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect([1000, 3000, 5000, 10000])
      .build();

    connectionRef.current = connection;

    connection
      .start()
      .then(() => {
        setConnected(true);
      })
      .catch((error) => console.log("SignalR connection error: ", error));

    // Listening for messages from the server
    connection.on("msgToClient", props.handleMessage);
    connection.on("message", (message) => {
      setClientId(message);
    });

    connection.onclose((error) => {
      setConnected(false);
    });

    return () => {
      connection.stop(); // Clean up the connection on unmount
    };
  }, [props.namespace, props.handleMessage]);

  return {
    clientId: connected && clientId,
    connected,
  };
};

export default useSignalR;
