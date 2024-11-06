
import OpenAI from "openai"

export default function Chat({messages}:{messages: OpenAI.Beta.Threads.Messages.Message[]}) {
    return <div className="flex-grow overflow-y-auto p-4 space-y-4">
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
          {msg.content[0]?.text?.value}
        </div>
      </div>
    ))}
  </div>
}