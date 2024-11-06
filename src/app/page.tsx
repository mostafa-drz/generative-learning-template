import Chat from "./components/Chat";
import NewMessageForm from "./components/NewMessageForm";
import { cookies } from "next/headers";
import { getUserByID,setUserThreadId } from "@/utils/firebase";
import { createThread, getThreadMessages } from "@/utils";

export async function getUserThreadMessages() {
  const ASSISTANT_ID = process.env.OPEN_AI_ASSISTANT_ID as string;
  if(!ASSISTANT_ID){
      throw new Error("Assistant ID not found");
  }
  const allCookies = await cookies();
  const userId = allCookies.get('userId')?.value;
  console.log("User ID from cookies", userId)
  if(!userId) {
      console.error('User id not found on the cookies')
      throw new Error("Not Authorized");

  }
  const user = await getUserByID(userId);
  if(!user) {
      console.error('User not found on DB')
      throw new Error("Not Authorized");
  }
  let userThreadId = user?.threadID;
  if(!userThreadId) {
      console.log("No thread ID found for user, creating a new thread")
      userThreadId = (await createThread()).id;
      await setUserThreadId(userId, userThreadId);
      console.log("Thread created and updated in DB")
  }
  const threadMessages = await getThreadMessages(userThreadId);
  console.log({threadMessages})
  return threadMessages;
}
export default async function ChatPage() {
  const messages = await getUserThreadMessages();
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="p-4 bg-blue-600 text-white text-center shadow-md">
        <h1 className="text-xl font-semibold">Chat Education</h1>
      </header>

      {/* Chat Area */}
      <Chat messages={messages}/>

      {/* Input Area */}
      <NewMessageForm />
    </div>
  );
}