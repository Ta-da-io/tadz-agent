import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json';
import './LoadingQuotes.css';

const quotes = [
  {
    text: "Did you know? AI agents can analyze millions of blockchain transactions in seconds—faster than a caffeine boost kicks in!",
    citation: "Tadz Agent"
  },
  {
    text: "Exploring the chain... Every block holds a story, and we're here to help you uncover it.",
    citation: "Tadz Agent"
  },
  {
    text: "Web3 isn't the future anymore—it's the now. Let's dive in together.",
    citation: "Tadz Agent"
  },
  {
    text: "Your AI agent is decoding hashes and chasing smart contracts. Sit tight!",
    citation: "Tadz Agent"
  },
  {
    text: "Fun fact: The first blockchain transaction was for 10,000 Bitcoins... to buy two pizzas!",
    citation: "Tadz Agent"
  },
  {
    text: "Smart agents, smarter chains: Your exploration journey is powered by AI intelligence.",
    citation: "Tadz Agent"
  },
  {
    text: "Building trust, block by block. Every verified transaction matters.",
    citation: "Tadz Agent"
  },
  {
    text: "Ever wonder? Web3 is like an open-world game, but your assets are real and yours forever.",
    citation: "Tadz Agent"
  },
  {
    text: "Loading... AI agents are optimizing pathways on the decentralized web.",
    citation: "Tadz Agent"
  },
  {
    text: "Blockchain explorers: because transparency is the ultimate superpower.",
    citation: "Tadz Agent"
  },
  {
    text: "Solana's blockchain can process up to 65,000 transactions per second. That's faster than I can say 'decentralized'!",
    citation: "Tadz Agent"
  },
  {
    text: "Think of me as your Web3 GPS—navigating the blockchain highways and DeFi byways.",
    citation: "Tadz Agent"
  },
  {
    text: "Did you know? The name 'Solana' was inspired by a small beach town in California. Sunny skies, sunny blockchain!",
    citation: "Tadz Agent"
  },
  {
    text: "Pro tip: Always verify smart contracts. Trust AI, but verify on-chain!",
    citation: "Tadz Agent"
  },
  {
    text: "Analyzing token metrics... Remember, even AI agents DYOR (Do Your Own Research)!",
    citation: "Tadz Agent"
  },
  {
    text: "Web3 wisdom: Your private keys are like your digital house keys—never share them, not even with friendly AI!",
    citation: "Tadz Agent"
  },
  {
    text: "Fun fact: Each Solana block takes only 400 milliseconds to process. That's shorter than a hummingbird's wing flap!",
    citation: "Tadz Agent"
  },
  {
    text: "Blockchain meets AI: Like peanut butter meets jelly, but with more cryptography.",
    citation: "Tadz Agent"
  },
  {
    text: "Remember: The best time to learn about Web3 was yesterday. The second best time is now!",
    citation: "Tadz Agent"
  },
  {
    text: "Scanning liquidity pools... Did you know they're like digital vending machines that never sleep?",
    citation: "Tadz Agent"
  },
  {
    text: "Here's a secret: The best blockchain explorers are powered by curiosity (and a dash of AI magic).",
    citation: "Tadz Agent"
  },
  {
    text: "Smart contracts are like digital handshakes—trustless, transparent, and tamper-proof!",
    citation: "Tadz Agent"
  },
  {
    text: "Tip of the day: Always check token liquidity. It's like making sure your boat has water under it!",
    citation: "Tadz Agent"
  },
  {
    text: "Did you know? Every Solana transaction uses less energy than two Google searches!",
    citation: "Tadz Agent"
  },
  {
    text: "Web3 + AI = The perfect dance partners for your digital adventure.",
    citation: "Tadz Agent"
  },
  {
    text: "Proof of History: Solana's secret sauce for keeping time in a timeless blockchain.",
    citation: "Tadz Agent"
  },
  {
    text: "Decoding DEXs and AMMs... Imagine a robot mathematician running a digital currency exchange!",
    citation: "Tadz Agent"
  },
  {
    text: "Remember: In Web3, you're not just a user—you're an owner. How cool is that?",
    citation: "Tadz Agent"
  },
  {
    text: "NFTs aren't just jpegs—they're digital proof that even robots can appreciate art!",
    citation: "Tadz Agent"
  },
  {
    text: "Fun fact: Some Solana validators process more daily transactions than major stock exchanges!",
    citation: "Tadz Agent"
  }
];

const LoadingQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Initialize with random quote
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(randomIndex);
    return () => setDisplayText('');
  }, []);

  // Handle typing effect and quote cycling
  useEffect(() => {
    const quote = quotes[currentQuote].text;
    let index = 0;
    setIsTyping(true);
    setFadeOut(false);
    setDisplayText('');

    // Typing effect
    const typingInterval = setInterval(() => {
      if (index <= quote.length) {
        setDisplayText(quote.slice(0, index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        
        // Start fade out after 3 seconds of completing the typing
        setTimeout(() => {
          setFadeOut(true);
          
          // Change quote after fade out animation (0.5s)
          setTimeout(() => {
            let nextIndex = (currentQuote + 1) % quotes.length;
            setCurrentQuote(nextIndex);
          }, 500);
        }, 3000);
      }
    }, 30);

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentQuote]);

  return (
    <div className="loading-quotes">
      <div className="loading-animation">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          style={{ width: 100, height: 100 }}
        />
      </div>
      <div className={`quote-container ${fadeOut ? 'fade-out' : ''}`}>
        <p className="quote-text">{displayText}</p>
        {!isTyping && (
          <p className="quote-citation">— {quotes[currentQuote].citation}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingQuotes; 