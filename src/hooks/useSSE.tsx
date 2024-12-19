import { useEffect, useRef, useState } from "react";

type Props = {
  namespace: string;
  handleMessage: (message: any) => void;
};

const useSSE = (props: Props) => {
  const eventSourceRef = useRef<EventSource | null>(null);

  const [connected, setConnected] = useState(false);
  const [clientId, setClientId] = useState<string | undefined>();

  useEffect(() => {
    const eventSource = new EventSource(`https://zalo.dion.vn/login-portal`, {
      withCredentials: true,
    });

    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setConnected(true);
    };

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      props.handleMessage(message);

      if (message.clientId) {
        setClientId(message.clientId);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error", error);
      setConnected(false);

      // Close connection on error
      eventSource.close();
    };

    return () => {
      eventSource.close(); // Clean up the EventSource connection on unmount
    };
  }, [props.namespace, props.handleMessage]);

  return {
    clientId: connected && clientId,
    connected,
  };
};

export default useSSE;
