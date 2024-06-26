"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import io from "socket.io-client";
const socket = io("http://localhost:3001");

const WSHandler = () => {
  const router = useRouter();

  const handleRoomUpdate = () => {
    if (!socket) return;
    router.refresh();
    console.log("Room updated");
  };

  useEffect(() => {
    socket.on("roomUpdate", handleRoomUpdate);

    // Clean up socket listeners when component unmounts
    return () => {
      socket.off("roomUpdate", handleRoomUpdate);
    };
  }, [socket, router]);

  return null;
};

export { WSHandler };
