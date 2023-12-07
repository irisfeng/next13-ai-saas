"use client";

import { useChat } from 'ai/react';

import { Message } from 'ai';

export default function ConversationPage() {
  
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit,
    setMessages,
    isLoading,
    error
    } = useChat({
      api: '/api/conversation',
    });

  return (
    <div className="mx-auto w-full h-screen max-w-lg p-24 flex flex-col">
      <div className="h-full">
        {messages.length > 0 ?
        messages.map(m => (
          <ChatMessage message={m} key={m.id} />
        )) : null}
      </div>
      <form className="flex space-x-4" onSubmit={handleSubmit}>
        <input
          className="rounded-md p-2 text-black"
          value={input}
          onChange={handleInputChange}
          placeholder="说些什么吧..."
        />
        <button
          // className="border-solid border-2 border-white p-2 rounded-md"
          type="submit" 
        >
          发送
        </button>
      </form>
    </div>
  );
}

function ChatMessage({message: {role, content}}: {message: Message}) {
  return (
  <div className='mb-3'>
    <div>{role}</div>
    <div>{content}</div>
  </div>
  );
}





