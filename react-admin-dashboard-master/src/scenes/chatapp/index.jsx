import React, { useState } from 'react';
import './chat.css';

// ChatItem Component
const ChatItem = ({ name, date, message, active, onClick }) => {
  return (
    <div
      className={`chat-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="chat-item-avatar"></div>
      <div className="chat-item-info">
        <div className="chat-item-name">{name}</div>
        <div className="chat-item-date">{date}</div>
        <div className="chat-item-message">{message}</div>
      </div>
    </div>
  );
};

// ChatList Component
const ChatList = ({ onSelect, activePerson }) => {
  const contacts = [
    { name: "Frank Pauell", date: "2017 yil 12 iyun", message: "Hello, how are you doing today?" },
    { name: "Betti Diaz", date: "2019 yil 10 mart", message: "Just checking in to see if you’re okay." },
    { name: "Brayan Stivens", date: "2024 yil 10 avgust", message: "Are we still on for the meeting?" },
    { name: "Jaklin kuni", date: "2024 yil 10 avgust", message: "Please review the documents I sent." },
    { name: "Alice Johnson", date: "2022 yil 8 yanvar", message: "Looking forward to our next project together." },
    { name: "Bob Smith", date: "2021 yil 25 dekabr", message: "Don’t forget to send the report by noon." },
    { name: "Carol Evans", date: "2023 yil 17 aprel", message: "Can you help me with the new assignment?" },
    { name: "David Clark", date: "2023 yil 30 iyul", message: "I’ll be out of office next week." },
    { name: "Eve Adams", date: "2023 yil 22 noyabr", message: "Let’s discuss the upcoming event details." },
    { name: "Franklin Grant", date: "2022 yil 15 avgust", message: "Thanks for your prompt response last night." },
  ];

  return (
    <div className="chat-list">
      {contacts.map((contact, index) => (
        <ChatItem
          key={index}
          name={contact.name}
          date={contact.date}
          message={contact.message}
          active={activePerson === contact.name}
          onClick={() => onSelect(contact.name)}
        />
      ))}
    </div>
  );
};

// ChatWindow Component
const ChatWindow = ({ person, messages }) => {
  return (
    <div className="chat-window">
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message-item ${msg.sender === 'user' ? 'user-message' : 'contact-message'}`}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

// ChatApp Component
const ChatApp = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
    // When a person is selected, add a "Hello" message from them
    setMessages([{ text: "Hello", sender: 'contact' }]);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() && selectedPerson) {
      setMessages([...messages, { text: currentMessage, sender: 'user' }]);
      setCurrentMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="chat-app">
      <div className="chat-sidebar">
        <ChatList onSelect={handleSelectPerson} activePerson={selectedPerson} />
      </div>
      <div className="chat-content">
        <ChatWindow person={selectedPerson} messages={messages} />
        <div className="message-input">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Xabaringizni shu yerga yozing*"
          />
          <button className="send-button" onClick={handleSendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
