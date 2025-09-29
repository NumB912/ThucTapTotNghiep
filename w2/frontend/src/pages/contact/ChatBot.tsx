import React, { useEffect, useRef, useState } from "react";
import type { Message } from "../../model/message";
import RenderBubble from "./renderbubble";
import useSendChatBot from "../../hook/useSendChatBot";
import { useNavigate } from "react-router";
import ButtonBack from "../../component/buttonBack";

type ChatbotProps = {
  messages?: Message[];
  placeholder?: string;
  title?: string;
};

export default function Chatbot({
  messages: initialMessages = [],
  placeholder = "Gửi tin nhắn...",
  title = "Chatbot",
}: ChatbotProps) {
  const { onSend } = useSendChatBot();

  const [messages, setMessages] = useState<Message[]>(() => initialMessages);
  const [text, setText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      const el = listRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now() + "-u",
      role: "user",
      text: trimmed,
      time: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);
    setText("");

    try {
      if (onSend) {
        setIsTyping(true);
        const reply = await onSend(trimmed);

        if (reply) {
          if (typeof reply === "string") {
            const assistantMsg: Message = {
              id: Date.now() + "-a",
              role: "assistant",
              text: reply,
              time: new Date().toISOString(),
            };
            setMessages((m) => [...m, assistantMsg]);
          } else if (Array.isArray(reply)) {
            setMessages((m) => [...m, ...reply]);
          }
        }
      } else {
        setIsTyping(true);
        setTimeout(() => {
          const assistantMsg: Message = {
            id: Date.now() + "-a",
            role: "assistant",
            text: `Mình đã nhận: "${trimmed}"`,
            time: new Date().toISOString(),
          };
          setMessages((m) => [...m, assistantMsg]);
          setIsTyping(false);
        }, 800);
      }
    } catch (err) {
      const errMsg: Message = {
        id: Date.now() + "-e",
        role: "system",
        text: "Lỗi khi gửi tin — thử lại.",
        time: new Date().toISOString(),
      };
      setMessages((m) => [...m, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className=" rounded-none shadow-none bg-white overflow-hidden flex flex-col p-5 h-screen">
      <div className="flex items-center justify-between px-4 py-3 shadow">
        <div className="flex items-center gap-3">
                 <ButtonBack url="/" />
          <div className="w-10 h-10 rounded-md bg-indigo-600 flex items-center justify-center text-white font-semibold">
            CB
          </div>
          <div>
            <div className="text-sm font-semibold">{title}</div>
            <div className="text-xs text-gray-500">Trò chuyện với trợ lý</div>
          </div>
        </div>
      </div>

      <div ref={listRef} className="overflow-auto p-4 space-y-3 h-full">
        {messages.length === 0 && (
          <div className="text-center text-sm text-gray-500 mt-12">
            Bắt đầu cuộc trò chuyện — hãy gửi câu hỏi của bạn.
          </div>
        )}

        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <RenderBubble
              key={m.id}
              id={m.id}
              role={m.role}
              text={m.text}
              time={m.time}
            />
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="flex-none w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                AI
              </div>
              <div className="p-2 rounded-2xl bg-white shadow-sm">
                <div className="flex gap-1 items-center px-2 py-1">
                  <div className="w-2 h-2 rounded-full animate-bounce" />
                  <div className="w-2 h-2 rounded-full animate-bounce delay-75" />
                  <div className="w-2 h-2 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-3 py-3 shadow border-t border-gray-200 bg-white">
        <div className="flex items-end gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="flex-1 resize-none min-h-[44px] max-h-36 p-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-300"
          />
          <button
            onClick={handleSend}
            className="flex-none px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium shadow-md hover:opacity-95"
          >
            Gửi
          </button>
        </div>
        <div className="mt-2 flex items-center justify-end text-xs text-gray-500">
          <div>Nhấn Enter để gửi — Shift+Enter xuống dòng</div>
        </div>
      </div>
    </div>
  );
}
