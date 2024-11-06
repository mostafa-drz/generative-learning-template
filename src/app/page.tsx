"use client";
import { postMessageToThread } from "./actions";

export default function ChatPage() {

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="p-4 bg-blue-600 text-white text-center shadow-md">
        <h1 className="text-xl font-semibold">Chat Education</h1>
      </header>

      {/* Chat Window
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg p-3 max-w-xs ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              {msg.content.toString()}
            </div>
          </div>
        ))}
      </div> */}

      {/* Input Area */}
      <form className="p-4 bg-white shadow-md flex text-slate-900" action={postMessageToThread}>
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
          name="message"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}