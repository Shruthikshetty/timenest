"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { socket } from "~/lib/socket";

const Chat = () => {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const [receiverRefId, setReceiverRefId] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    }, 1000 * 60); // every 1 minute
    return () => clearInterval(interval);
  }, [queryClient]);

  // Example: Extract userId from query string using Next.js hook
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  // Get access token from cookies
  const getAccessToken = () =>
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

  // Fetch messages
  const { data, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const accessToken = getAccessToken();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      return res.data.data;
    },
  });

  // Send message
  const sendMessage = useMutation({
    mutationFn: async (newMessage: string) => {
      const accessToken = getAccessToken();
      return axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages`,
        { content: newMessage, receiver: receiverRefId },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  useEffect(() => {
    if (!userId) return;

    // Connect and join user room
    socket.io.opts.query = { userId }; // only once
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to socket", socket.id);
    });

    socket.on("receive_message", (data) => {
      console.log("New message:", data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["messages"], (old: any) =>
        old ? [...old, data] : [data]
      );
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [queryClient, userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) sendMessage.mutate(message);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border shadow rounded">
      {/* Receiver Input */}
      <div className="p-3 border-b bg-white">
        <input
          type="text"
          value={receiverRefId}
          placeholder="Receiver userId"
          onChange={(e) => setReceiverRefId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring bg-gray-100"
        />
      </div>
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {isLoading ? (
          <p>Loading messages...</p>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.map((item: any, index: number) => (
            <div
              key={index}
              className={`mb-3 p-2 rounded shadow ${
                item?.sender === userId
                  ? "bg-green-100 text-right"
                  : "bg-white text-left"
              } text-gray-800`}
            >
              {item?.content ?? "---"}
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center p-3 border-t bg-white"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg mr-2 focus:outline-none focus:ring"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
