"use client";   
import { postMessageToThread } from "../actions";

export default function NewMessageForm(){
    return <form className="p-4 bg-white shadow-md flex text-slate-900" action={postMessageToThread}>
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
}