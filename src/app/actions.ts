"use server";
import {cookies} from 'next/headers'
import { getUserByID, setUserThreadId } from '@/utils/firebase';
import { createThread,sendMessageToThread } from '@/utils';

const ASSISTANT_ID = process.env.OPEN_AI_ASSISTANT_ID as string;

export async function postMessageToThread(formData: FormData) {
    if(!ASSISTANT_ID){
        throw new Error("Assistant ID not found");
    }
    const message = formData.get('message')?.toString();
    if(!message) {
        throw new Error("Message is required");
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
   const messages = await sendMessageToThread(message, userThreadId, ASSISTANT_ID);
   console.log({messages})
}