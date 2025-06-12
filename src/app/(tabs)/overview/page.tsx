/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

//This is the default tab overview of the app
const OverView = () => {
  const socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
    query: { userId: process.env.NEXT_PUBLIC_USER_ID },
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected!", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    // Listen for a custom event, e.g., "message"
    socket.on("receive_message", (data) => {
      console.log("Received message from server:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  //this is an example so thi will auto login
  useEffect(() => {
    // Attempt login and store token in cookies (if not already present)
    axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
      {
        email: "john.doe@example.com",
        password: process.env.NEXT_PUBLIC_USER_PASS,
      },
      { withCredentials: true }
    );
  }, []);

  // get message
  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      return axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/messages`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
    },
  });

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      {data?.data?.data?.map((item: any, index: number) => (
        <React.Fragment key={index}>
          <br />
          <p>{item?.content ?? "---"}</p>
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default OverView;
