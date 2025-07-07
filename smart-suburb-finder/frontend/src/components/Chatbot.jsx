import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Chatbot.module.css';

const suggestedQuestions = [
  "What are the best suburbs for families?",
  "Tell me about South Yarra",
  "Which suburbs have good schools?",
  "What's the average rent in Melbourne?",
  "Which suburbs are close to the beach?"
];

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Melbourne suburb assistant. Ask me anything about suburbs, neighborhoods, or living in Melbourne!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again later!",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question) => {
    setInputMessage(question);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className={styles.chatToggleBtn}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.chatHeader}>
              <h3>Melbourne Suburb Assistant</h3>
              <button 
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className={styles.chatMessages}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`${styles.message} ${styles[message.sender]}`}
                  initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.messageContent}>
                    <p>{message.text}</p>
                    <span className={styles.messageTime}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  className={`${styles.message} ${styles.bot}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className={styles.messageContent}>
                    <div className={styles.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {showSuggestions && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ marginTop: '1rem', padding: '0 0.5rem' }}
                >
                  <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 0.5rem 0', textAlign: 'center' }}>
                    Try asking:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(question)}
                        style={{
                          background: '#f8f9fa',
                          border: '1px solid #e9ecef',
                          borderRadius: '12px',
                          padding: '0.6rem 1rem',
                          fontSize: '0.8rem',
                          color: '#495057',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          textAlign: 'left',
                          lineHeight: '1.3'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#e75480';
                          e.target.style.color = 'white';
                          e.target.style.borderColor = '#e75480';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 2px 8px rgba(231, 84, 128, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = '#f8f9fa';
                          e.target.style.color = '#495057';
                          e.target.style.borderColor = '#e9ecef';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <form className={styles.chatInputForm} onSubmit={handleSendMessage}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Melbourne suburbs..."
                className={styles.chatInput}
                disabled={isLoading}
              />
              <button
                type="submit"
                className={styles.sendBtn}
                disabled={!inputMessage.trim() || isLoading}
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}