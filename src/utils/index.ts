import {OpenAI} from 'openai'

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

export async function createThread() {
    const thread = await openai.beta.threads.create();
    return thread;
}

async function createUserMessage(text: string, threadId: string) {
    const message = await openai.beta.threads.messages.create(threadId,{
        content:text,
        role: 'user'
    });
    return message;
}

 async function createAssistantRun(threadId:string, assistantId:string) {
    const run = await openai.beta.threads.runs.createAndPoll(threadId, {
        assistant_id: assistantId
    });
    return run;
}

async function isRunComplete(run:OpenAI.Beta.Threads.Runs.Run) {
    return run?.status === 'completed';
}

 async function getRunMessages(run:OpenAI.Beta.Threads.Runs.Run) {
    const messages = await openai.beta.threads.messages.list(
        run.thread_id
      );
      return messages
}

export async function sendMessageToThread(text:string, threadId:string, assistantId:string) {
    await createUserMessage(text, threadId);
    const run = await createAssistantRun(threadId, assistantId);
    while(!(await isRunComplete(run))) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    const messages = await getRunMessages(run);
    return messages;
}

export async function getThreadMessages(threadId:string) {
    const messages = await openai.beta.threads.messages.list(threadId);
    return messages;
}

export async function deleteThread(threadId:string) {
    await openai.beta.threads.del(threadId);
}   