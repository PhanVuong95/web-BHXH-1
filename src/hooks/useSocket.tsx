import { useEffect, useRef, useState } from "react";
import { Manager, Socket } from "socket.io-client";

const manager = new Manager(`wss://zalo.dion.vn/socket.io`, {
  reconnectionDelayMax: 10000,
  query: {},
  transports: ["websocket"],
});

type Props = {
  namespace: string;
  handleMessage: (message: any) => void;
};

const useSocket = (props: Props) => {
  const socketNamespace = useRef<Socket | null>(null); // Khởi tạo null để tránh undefined

  const [connected, setConnected] = useState(false);
  const [clientId, setClientId] = useState<string | undefined>();

  useEffect(() => {
    // Tạo socket từ namespace
    const socket = manager.socket(props.namespace);
    socketNamespace.current = socket;

    socket.on("connect", () => {
      setConnected(true);
    });

    // Lắng nghe sự kiện msgToClient và message
    socket.on("msgToClient", props.handleMessage);
    socket.on("message", (message) => {
      setClientId(message);
    });

    socket.on("connect_error", (e) => {
      console.error("Connection error", e);
    });

    // Đảm bảo đóng kết nối khi component unmount
    return () => {
      socket.disconnect();
      socketNamespace.current = null;
    };
  }, [props.namespace, props.handleMessage]);

  return {
    clientId: connected ? clientId : undefined, // Chỉ trả clientId khi đã kết nối
    connected,
  };
};

export default useSocket;
