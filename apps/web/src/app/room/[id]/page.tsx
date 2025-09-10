'use client';

import { useState, useEffect } from 'react';

interface AuctionRoomProps {
  params: {
    id: string;
  };
}

export default function AuctionRoomPage({ params }: AuctionRoomProps) {
  const [connected, setConnected] = useState(false);
  const [currentBid, setCurrentBid] = useState(1500);
  const [bidAmount, setBidAmount] = useState(1600);
  const [timeRemaining, setTimeRemaining] = useState(1245); // seconds
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'John Bidder', message: 'Great digital human!', timestamp: '15:23' },
    { id: 2, user: 'AI Host', message: 'We have a new bid of $1,500! Any higher bids?', timestamp: '15:24' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePlaceBid = () => {
    // TODO: Implement real bid placement
    console.log('Placing bid:', bidAmount);
    alert(`Bid of $${bidAmount} will be implemented with Socket.IO`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // TODO: Implement real chat
    const newMsg = {
      id: Date.now(),
      user: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Auction Room #{params.id}</h1>
            <p className="text-gray-400">AI Digital Human Avatar #002</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">
              {formatTime(timeRemaining)}
            </div>
            <p className="text-sm text-gray-400">Time Remaining</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Main Video Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <div className="bg-black rounded-lg overflow-hidden aspect-video">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
              <div className="text-center">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold mb-2">AI Digital Host</h3>
                <p className="text-gray-300">Live stream will play here</p>
                <p className="text-sm text-gray-400 mt-2">HLS URL: {process.env.NEXT_PUBLIC_HLS_URL}</p>
              </div>
            </div>
          </div>

          {/* Digital Human Controls */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Digital Host Controls</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
                Welcome Speech
              </button>
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm">
                Bid Announcement
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-sm">
                Time Warning
              </button>
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm">
                Auction Ending
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Click to trigger AI host speech (placeholder functionality)
            </p>
          </div>

          {/* Auction Info */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Product Information</h3>
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium">AI Digital Human Avatar #002</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Custom digital human with specialized knowledge in finance and business. 
                  Perfect for virtual assistants and customer service applications.
                </p>
                <div className="mt-2 text-sm">
                  <span className="text-gray-400">Starting Price:</span>
                  <span className="text-green-400 font-medium ml-2">$1,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Bidding Panel */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Current Bid</h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-green-400">
                ${currentBid.toLocaleString()}
              </div>
              <p className="text-gray-400 text-sm">Leading: John Bidder</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Your Bid</label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  min={currentBid + 100}
                  step={100}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
              <button
                onClick={handlePlaceBid}
                className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-medium"
              >
                Place Bid
              </button>
              <p className="text-xs text-gray-400 text-center">
                Minimum increment: $100
              </p>
            </div>
          </div>

          {/* Recent Bids */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Recent Bids</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              <div className="flex justify-between text-sm">
                <span className="text-green-400">$1,500</span>
                <span className="text-gray-400">John Bidder</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>$1,400</span>
                <span className="text-gray-400">Alice Smith</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>$1,300</span>
                <span className="text-gray-400">Mike Johnson</span>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Live Chat</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto mb-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="text-sm">
                  <span className="font-medium text-blue-400">{msg.user}:</span>
                  <span className="text-gray-300 ml-1">{msg.message}</span>
                  <span className="text-gray-500 text-xs ml-2">{msg.timestamp}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm text-white"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}