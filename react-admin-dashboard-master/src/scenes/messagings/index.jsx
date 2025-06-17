import React, { useState } from 'react';
import './messagings.css';
import { initialMessages } from "../../data/mockData";


const Messagings = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState({ recipient: '', subject: '', body: '' });
  const [templates, setTemplates] = useState([]);

  const handleMarkAsRead = (id) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, status: 'Read' } : msg));
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleSendMessage = () => {
    // Add message sending logic here
    console.log('Sending message:', newMessage);
    setNewMessage({ recipient: '', subject: '', body: '' });
  };

  const handleTemplateChange = (template) => {
    setNewMessage({ ...newMessage, body: template });
  };

  return (
    <div className="messaging">
      <div className="inbox">
        <h2>Inbox</h2>
        <table>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Subject</th>
              <th>Date Received</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg.id}>
                <td>{msg.sender}</td>
                <td>{msg.subject}</td>
                <td>{msg.date}</td>
                <td>{msg.status}</td>
                <td>
                  <button onClick={() => handleMarkAsRead(msg.id)}>Mark as Read</button>
                  <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="compose">
        <h2>Compose Message</h2>
        <form>
          <label>
            Recipient:
            <input type="text" value={newMessage.recipient} onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })} />
          </label>
          <label>
            Subject:
            <input type="text" value={newMessage.subject} onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })} />
          </label>
          <label>
            Message Body:
            <textarea value={newMessage.body} onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}></textarea>
          </label>
          <button type="button" onClick={handleSendMessage}>Send</button>
        </form>
      </div>

      <div className="sent-messages">
        <h2>Sent Messages</h2>
        <table>
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Subject</th>
              <th>Date Sent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg.id}>
                <td>{msg.sender}</td>
                <td>{msg.subject}</td>
                <td>{msg.date}</td>
                <td>{msg.status}</td>
                <td>
                  <button onClick={() => console.log('Viewing details of message id', msg.id)}>View Details</button>
                  <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="message-templates">
        <h2>Message Templates</h2>
        <ul>
          {templates.map((template, index) => (
            <li key={index} onClick={() => handleTemplateChange(template.body)}>{template.name}</li>
          ))}
        </ul>
        <button onClick={() => console.log('Creating new template')}>Create Template</button>
      </div>

      <div className="notifications">
        <h2>Notifications</h2>
        <button onClick={() => console.log('Managing notifications')}>Manage Notifications</button>
      </div>

      <div className="settings">
        <h2>Messaging Settings</h2>
        <button onClick={() => console.log('Configuring settings')}>Configure Settings</button>
      </div>
    </div>
  );
};

export default Messagings;
