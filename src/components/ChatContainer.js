import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined, AudioOutlined } from '@ant-design/icons';
import { FaHistory, FaWallet, FaChartLine, FaShieldAlt, FaCoins, FaBell, FaThumbsUp, FaThumbsDown, FaRedo } from 'react-icons/fa';
import './ChatContainer.css';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (add these environment variables to your .env file)
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const ChatContainer = forwardRef(({ currentNetwork, onTokenDataUpdate, onLoading }, ref) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [solanaSessionId, setSolanaSessionId] = useState(null);
  const [mvxSessionId, setMvxSessionId] = useState(null);
  const [solanaHistory, setSolanaHistory] = useState([
    {
      type: 'ai',
      content: "🤖 Greetings! I can assist you in auditing any Solana token. Please click on one option or ask me a question about Solana."
    }
  ]);
  const [mvxHistory, setMvxHistory] = useState([
    {
      type: 'ai',
      content: "🤖 Greetings! I can assist you in auditing any MultiversX token. Please click on one option or ask me a question about MultiversX."
    }
  ]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [feedbackGiven, setFeedbackGiven] = useState({}); // Will store 'up' or 'down' instead of just true

  const currentHistory = currentNetwork === 'solana' ? solanaHistory : mvxHistory;

  const generateSessionId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}-${random}`;
  };

  useEffect(() => {
    const newSolanaSessionId = generateSessionId();
    const newMvxSessionId = generateSessionId();
    
    setSolanaSessionId(newSolanaSessionId);
    setMvxSessionId(newMvxSessionId);
    
    localStorage.setItem('solanaSessionId', newSolanaSessionId);
    localStorage.setItem('mvxSessionId', newMvxSessionId);
  }, []);

  useImperativeHandle(ref, () => ({
    setInputAndSend: (text, isComingSoonMessage = false) => {
      if (isComingSoonMessage) {
        // Add the message directly to the chat history without sending to API
        const currentSetHistory = currentNetwork === 'solana' ? setSolanaHistory : setMvxHistory;
        currentSetHistory(prev => [
          ...prev,
          { type: 'user', content: "Tell me about this feature" },
          { type: 'ai', content: text }
        ]);
      } else {
        setInput(text);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(text.length, text.length);
          }
        }, 0);
      }
    }
  }));

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    onLoading(true);

    const currentSessionId = currentNetwork === 'solana' ? solanaSessionId : mvxSessionId;
    const currentSetHistory = currentNetwork === 'solana' ? setSolanaHistory : setMvxHistory;

    currentSetHistory(prev => [...prev, { 
      type: 'user', 
      content: input
    }]);

    setInput('');

    // Add this check for MultiversX
    if (currentNetwork === 'mvx') {
      currentSetHistory(prev => [...prev, { 
        type: 'ai', 
        content: "🚧 I apologize, but I'm not yet able to process MultiversX queries. The MultiversX ecosystem integration is coming soon! 🔜\n\n" +
                 "🌟 Stay tuned for updates as we're working hard to bring you:\n" +
                 "• Token Analysis\n" +
                 "• Portfolio Tracking\n" +
                 "• Price Alerts\n" +
                 "• And much more!\n\n" +
                 "💡 In the meantime, feel free to try out all features on the Solana network!"
      }]);
      setLoading(false);
      onLoading(false);
      return;
    }

    try {
      const endpoint = currentNetwork === 'solana' 
        ? 'https://tadzagent.app.n8n.cloud/webhook/ask-solana'
        : 'https://tadzagent.app.n8n.cloud/webhook/ask-mvx'
        // ? 'http://localhost:5678/webhook/ask-solana'
        // : 'http://localhost:5678/webhook/ask-mvx';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          chat: input,
          sessionId: currentSessionId
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Add debug logging
      console.log('Raw response:', data);
      
      try {
        // Clean up the JSON string more carefully
        let jsonString = data[0].output
          .replace(/```json\n/g, '')
          .replace(/\n```/g, '')
          .replace(/\]\s*,\s*""/, ']') // Remove trailing comma and empty string
          .trim();

        // Add debug logging
        console.log('Cleaned JSON string:', jsonString);

        const parsedData = JSON.parse(jsonString);
        console.log('Parsed data:', parsedData);

        // Update token data if it's an audit request
        if (parsedData.output?.type === 'audit') {
          onTokenDataUpdate({
            type: parsedData.output.type,
            details: parsedData.output.details,
            links: parsedData.output.links
          });
        } else {
          onTokenDataUpdate(parsedData.output);
        }

        // Get the response text from the parsed data
        const botResponse = parsedData.output?.text || data[0].answer || "No response received";

        // Add response to chat history
        currentSetHistory(prev => [...prev, { 
          type: 'ai', 
          content: botResponse
        }]);

      } catch (parseError) {
        console.error('JSON Parsing Error:', parseError);
        console.log('Problematic JSON string:', data[0].output);
        throw new Error('Failed to parse response data');
      }

    } catch (err) {
      console.error('Error:', err);
      currentSetHistory(prev => [...prev, { 
        type: 'ai', 
        content: "I apologize, but I encountered an error processing your request. Please try again."
      }]);
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    {
      icon: <FaHistory />,
      tooltip: "Transaction History",
      example: "I want to see the transaction history of wallet:"
    },
    {
      icon: <FaWallet />,
      tooltip: "Wallet Portfolio",
      example: "Show me the portfolio of this wallet:"
    },
    {
      icon: <FaChartLine />,
      tooltip: "Chain Information",
      example: "Can you give me the current Solana chain stats?"
    },
    {
      icon: <FaShieldAlt />,
      tooltip: "Token Analysis",
      example: "Analyze this token for me:"
    },
    {
      icon: <FaCoins />,
      tooltip: "Price Tracking",
      example: "What's the current price of:"
    },
    {
      icon: <FaBell />,
      tooltip: "Set Price Alert",
      example: "Alert me when Solana reaches:"
    }
  ];

  const handleQuickAction = (example) => {
    setInput(example);
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(example.length, example.length);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentHistory]);

  const handleFeedback = async (messageIndex, isPositive, question, answer) => {
    const currentFeedback = feedbackGiven[messageIndex];
    
    try {
      // If clicking the same button again, delete the feedback
      if (currentFeedback === (isPositive ? 'up' : 'down')) {
        // Delete from database
        const { error } = await supabase
          .from('chat_feedback')
          .delete()
          .match({ 
            question: question,
            answer: answer,
            network: currentNetwork 
          });

        if (error) throw error;

        // Remove feedback from local state
        setFeedbackGiven(prev => {
          const newState = { ...prev };
          delete newState[messageIndex];
          return newState;
        });
        
        return;
      }

      // If other button was previously clicked, delete old feedback first
      if (currentFeedback) {
        await supabase
          .from('chat_feedback')
          .delete()
          .match({ 
            question: question,
            answer: answer,
            network: currentNetwork 
          });
      }

      // Insert new feedback
      const { error } = await supabase
        .from('chat_feedback')
        .insert([
          {
            question,
            answer,
            is_positive: isPositive,
            network: currentNetwork,
            timestamp: new Date().toISOString(),
          }
        ]);

      if (error) throw error;

      // Update local state with the type of feedback given
      setFeedbackGiven(prev => ({
        ...prev,
        [messageIndex]: isPositive ? 'up' : 'down'
      }));

    } catch (error) {
      console.error('Error handling feedback:', error);
    }
  };

  const handleNewChat = () => {
    // Generate new session IDs
    const newSolanaSessionId = generateSessionId();
    const newMvxSessionId = generateSessionId();
    
    // Update session IDs
    setSolanaSessionId(newSolanaSessionId);
    setMvxSessionId(newMvxSessionId);
    localStorage.setItem('solanaSessionId', newSolanaSessionId);
    localStorage.setItem('mvxSessionId', newMvxSessionId);
    
    // Reset chat histories
    setSolanaHistory([{
      type: 'ai',
      content: "🤖 Greetings! I can assist you in auditing any Solana token. Please click on one option or ask me a question about Solana."
    }]);
    setMvxHistory([{
      type: 'ai',
      content: "🤖 Greetings! I can assist you in auditing any MultiversX token. Please click on one option or ask me a question about MultiversX."
    }]);
    
    // Reset feedback state
    setFeedbackGiven({});
    
    // Clear main content
    onTokenDataUpdate(null);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {currentHistory.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">{message.content}</div>
            {message.type === 'ai' && index > 0 && (
              <div className="feedback-buttons">
                <button 
                  onClick={() => handleFeedback(
                    index,
                    true,
                    currentHistory[index - 1].content,
                    message.content
                  )}
                  className={`feedback-button ${feedbackGiven[index] === 'up' ? 'selected' : ''}`}
                  disabled={feedbackGiven[index] === 'down'}
                >
                  <FaThumbsUp />
                </button>
                <button 
                  onClick={() => handleFeedback(
                    index,
                    false,
                    currentHistory[index - 1].content,
                    message.content
                  )}
                  className={`feedback-button ${feedbackGiven[index] === 'down' ? 'selected' : ''}`}
                  disabled={feedbackGiven[index] === 'up'}
                >
                  <FaThumbsDown />
                </button>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="message ai">
            <div className="message-content loading">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="quick-actions">
        <div className="left-actions">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="quick-action-button"
              onClick={() => handleQuickAction(action.example)}
              title={action.tooltip}
            >
              {action.icon}
            </button>
          ))}
        </div>
        <div className="right-actions">
          <button
            className="quick-action-button new-chat-button"
            onClick={handleNewChat}
            title="Start New Chat"
          >
            <FaRedo />
          </button>
        </div>
      </div>
      <div className="chat-input">
        <Input
          ref={inputRef}
          placeholder="Ask about any token..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button 
          className="mic-button"
          icon={<AudioOutlined />}
          title="Voice input - Coming soon"
        >
          <span className="soon-tooltip">Soon you'll be able to talk to me directly</span>
        </Button>
        <Button 
          icon={<SendOutlined />} 
          onClick={handleSend}
          loading={loading}
        >
          Send
        </Button>
      </div>
    </div>
  );
});

export default ChatContainer; 