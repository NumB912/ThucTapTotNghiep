import React from "react";
import type { Message } from "../model/message";

const useSendChatBot = () => {
  async function onSend(
    message: string
  ): Promise<string | undefined> {
    try {
      if (!message) return;

      const response = await fetch("http://localhost:8000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      return data.reply as string;
    } catch (e) {
      console.error(e);
    }
  }

  return {
    onSend,
  };
};

export default useSendChatBot;
