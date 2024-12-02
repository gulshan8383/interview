import React, { useState, useEffect, useRef } from 'react'

const Chat = () => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { text: "Hello!", from: "friend" },
    { text: "Hi there!", from: "me" }
  ])

  const chatEndRef = useRef(null)  // Reference for scrolling

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { text: message, from: "me" }])
      setMessage("")
    }
  }

  useEffect(() => {
    // Scroll to the bottom of the chat when a new message is added
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])  // This effect runs when the messages state changes

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-bold text-green-600 mb-4'>Chats with Friends</h1>
      <div className='w-full h-[30rem] flex flex-row items-center justify-center gap-x-2'>
        
        {/* Chat Section - WhatsApp-like */}
        <div className='w-[70%] h-full border border-gray-300 rounded-xl px-4 pt-4'>
          <div className='h-[90%] overflow-y-auto'>
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.from === "me" ? 'text-right' : 'text-left'}`}>
                <p className={`inline-block p-2 rounded-md ${msg.from === "me" ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                  {msg.text}
                </p>
              </div>
            ))}
            {/* Scroll reference */}
            <div ref={chatEndRef} />
          </div>
          <div className='flex items-baseline'>
            <input 
              type='text' 
              className='flex-1 p-2 border border-gray-400 rounded-l-md' 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Type a message..."
            />
            <button 
              className='bg-blue-500 text-white p-2 rounded-r-md ml-1'
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>

        {/* Friends List - Facebook-like */}
        <div className='w-[30%] h-full border border-blue-300 p-2 rounded-xl'>
          <h1 className='text-xl  mb-4 font-bold border-b-2 py-1'>Friends</h1>
          <div className='space-y-3'>
            <div className='flex items-center'>
              <div className='w-10 h-10 bg-gray-400 rounded-full'></div>
              <span className='ml-3'>John Doe</span>
            </div>
            <div className='flex items-center'>
              <div className='w-10 h-10 bg-gray-400 rounded-full'></div>
              <span className='ml-3'>Jane Smith</span>
            </div>
            <div className='flex items-center'>
              <div className='w-10 h-10 bg-gray-400 rounded-full'></div>
              <span className='ml-3'>Alice Johnson</span>
            </div>
            {/* Add more friends as needed */}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Chat
