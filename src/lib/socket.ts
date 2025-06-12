"use client";
import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_BASE_URL!, {
  withCredentials: true, // Important if you're using cookies
  autoConnect: false,
  transports: ["websocket"], // optionally force only websocket
});