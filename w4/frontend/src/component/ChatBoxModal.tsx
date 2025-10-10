import React, { useEffect, useState } from "react";
import apiFetch from "../hook/useFetch";

interface ChatBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  coordinates: { x: number; y: number };
}

const ChatBotModal: React.FC<ChatBotModalProps> = ({
  isOpen,
  onClose,
  coordinates,
}) => {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Khi mở modal, chatbot chào + nói tọa độ
  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          from: "bot",
          text: `Bot: Bạn vừa chọn vị trí Lat: ${coordinates.x.toFixed(
            6
          )}, Lng: ${coordinates.y.toFixed(6)}. Có vấn đề gì tại đây?`,
        },
      ]);
    }
  }, [isOpen, coordinates]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await apiFetch("chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Tại tọa độ (${coordinates.x}, ${coordinates.y}), ${userMessage}`,
        }),
      });

      const data = await res.json();
      console.log(data)
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: `Bot: ${data.reply}` },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Bot: Xin lỗi, tôi không thể phản hồi ngay bây giờ." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 h-[80vh] rounded-lg flex flex-col overflow-hidden shadow-lg">
        {/* Header */}
        <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
          <span>ChatBot</span>
          <button onClick={onClose} className="font-bold">
            ✖
          </button>
        </div>

        <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] p-2 rounded ${
                msg.from === "user"
                  ? "bg-blue-100 self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="text-gray-400 italic text-sm self-start">
              Bot đang trả lời...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-2 flex gap-2 border-t">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded px-2 py-1"
            placeholder="Nhập tin nhắn..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "..." : "Gửi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotModal;
