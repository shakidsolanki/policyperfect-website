import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Paperclip, Shield, User, Phone, FileText } from 'lucide-react';
import { db } from '../utils/db';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  
  // Registration state (if not logged in)
  const [chatName, setChatName] = useState('');
  const [chatMobile, setChatMobile] = useState('');
  
  // Messages and typing state
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Poll for new messages/replies from Admin (via localStorage)
  useEffect(() => {
    // Check if customer is already logged in to pre-fill details
    const savedMobile = sessionStorage.getItem('customer_mobile');
    if (savedMobile) {
      setChatMobile(savedMobile);
      const allPolicies = db.getPolicies();
      const policy = allPolicies.find(p => p.mobile === savedMobile);
      setChatName(policy ? policy.name : 'Customer');
      setIsJoined(true);
    }
  }, [isOpen]);

  // Load and poll messages if joined
  useEffect(() => {
    if (!isJoined || !chatMobile) return;

    const loadChatMessages = () => {
      const chats = db.getChats();
      const currentChat = chats.find(c => c.mobile === chatMobile);
      if (currentChat) {
        setMessages(currentChat.messages || []);
      } else {
        // If chat record doesn't exist in DB yet, create it empty
        const newChat = {
          mobile: chatMobile,
          name: chatName || 'Customer',
          messages: [
            {
              sender: 'admin',
              text: `Hello ${chatName || 'there'}! How can we assist you today? You can ask us about policies, claims, or upload documents here.`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
        db.setChats([...chats, newChat]);
        setMessages(newChat.messages);
      }
    };

    loadChatMessages();
    const interval = setInterval(loadChatMessages, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, [isJoined, chatMobile, chatName]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStartChat = (e) => {
    e.preventDefault();
    if (!chatName.trim() || chatMobile.length !== 10) {
      alert('Please enter a valid Name and 10-digit Mobile Number.');
      return;
    }
    setIsJoined(true);
  };

  const handleSendMessage = (textToSend = inputText, fileName = null, fileData = null) => {
    const text = textToSend.trim();
    if (!text && !fileName) return;

    const newMsg = {
      sender: 'user',
      text: text || `Sent file: ${fileName}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...(fileName && { fileName, fileData })
    };

    const chats = db.getChats();
    const updatedChats = chats.map(chat => {
      if (chat.mobile === chatMobile) {
        return {
          ...chat,
          messages: [...chat.messages, newMsg]
        };
      }
      return chat;
    });

    // If chat wasn't in list somehow, add it
    if (!chats.some(c => c.mobile === chatMobile)) {
      updatedChats.push({
        mobile: chatMobile,
        name: chatName || 'Customer',
        messages: [newMsg]
      });
    }

    db.setChats(updatedChats);
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulated Auto-response if there is no admin active
    // (Wait 1.5s then simulate typing and a helpful reply if it's the first message)
    if (messages.filter(m => m.sender === 'user').length === 0) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const reply = {
            sender: 'admin',
            text: 'Thank you for messaging us. An agent has been notified and will reply shortly. You can also intimate claims or request endorsements from your Customer Portal.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          const currentChats = db.getChats();
          const autoUpdated = currentChats.map(chat => {
            if (chat.mobile === chatMobile) {
              return {
                ...chat,
                messages: [...chat.messages, reply]
              };
            }
            return chat;
          });
          db.setChats(autoUpdated);
          setMessages(prev => [...prev, reply]);
        }, 1500);
      }, 1000);
    }
  };

  // Handle File Upload and conversion to base64
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result;
      handleSendMessage(`Sent attachment: ${file.name}`, file.name, base64Data);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* Floating WhatsApp CTA (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-50 font-sans">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/917574948768?text=Hi,%20I'm%20interested%20in%20getting%20a%20free%20insurance%20quote."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-5 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl shadow-green-500/20 border border-white/10 font-black text-xs uppercase tracking-wider transition-all duration-300"
        >
          {/* WhatsApp Icon */}
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.498 1.451 5.438 1.453 5.494 0 9.961-4.47 9.965-9.97.002-2.663-1.032-5.166-2.91-7.047C17.262 1.715 14.76 1.68 12.087 1.68 6.592 1.68 2.124 6.149 2.12 11.65c-.002 1.947.504 3.85 1.464 5.46L2.6 20.25l3.22-.843zM18.06 14.612c-.328-.164-1.943-.96-2.247-1.07-.303-.11-.523-.165-.743.164-.22.33-.85.164-1.04.164-.19.001-.383-.082-.71-.247-1.385-.69-2.42-1.205-3.3-2.72-.228-.396.228-.367.653-1.217.07-.142.036-.266-.017-.372-.055-.107-.522-1.258-.716-1.724-.19-.453-.383-.39-.522-.397-.135-.007-.29-.008-.445-.008-.155 0-.408.058-.62.29-.214.234-.817.8-.817 1.948 0 1.15.836 2.257.95 2.417.114.16 1.644 2.512 3.985 3.52.556.24 1.0.384 1.34.492.56.177 1.07.152 1.472.09.45-.07 1.943-.794 2.217-1.52.274-.727.274-1.348.192-1.48-.08-.13-.3-.21-.628-.372z"/>
          </svg>
          <div className="flex flex-col text-left">
            <span className="text-[8px] text-green-100 font-bold leading-tight">Get Free Insurance Quote</span>
            <span className="text-white font-black leading-none text-[11px]">WhatsApp Now</span>
          </div>
        </motion.a>
      </div>

      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {/* Floating Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl shadow-blue-500/20 border border-white/10"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>

        {/* Chat Window Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 50 }}
              className="absolute bottom-16 right-0 w-[360px] h-[500px] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden text-slate-100"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/5 bg-slate-950/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">PolicyPerfect Support</h3>
                    <p className="text-[10px] text-slate-400">Average response time: 2 mins</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Chat Body */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {!isJoined ? (
                  /* Registration Step */
                  <form onSubmit={handleStartChat} className="h-full flex flex-col justify-center space-y-4 px-2">
                    <div className="text-center mb-4">
                      <Shield size={36} className="text-blue-400 mx-auto mb-2" />
                      <h4 className="text-sm font-bold text-white">Start Live Chat</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Enter details to connect with our support desk.</p>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={chatName}
                          onChange={(e) => setChatName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-blue-500 font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Mobile Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="10 digit number"
                          value={chatMobile}
                          onChange={(e) => setChatMobile(e.target.value.replace(/\D/g, ''))}
                          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-blue-500 font-semibold"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all"
                    >
                      Connect with Agents
                    </button>
                  </form>
                ) : (
                  /* Active Chat Conversation */
                  <>
                    {messages.map((m, idx) => (
                      <div 
                        key={idx} 
                        className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-xs font-semibold leading-relaxed ${
                          m.sender === 'user' 
                            ? 'bg-blue-600 text-white rounded-tr-none' 
                            : 'bg-slate-800 border border-white/5 text-slate-200 rounded-tl-none'
                        }`}>
                          {m.text}
                          {m.fileName && (
                            <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] text-blue-300 font-bold">
                              <FileText size={12} /> {m.fileName}
                            </div>
                          )}
                        </div>
                        <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex items-center gap-1 bg-slate-800 px-3.5 py-2 rounded-2xl rounded-tl-none border border-white/5 self-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200"></span>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input Footer */}
              {isJoined && (
                <div className="p-3 border-t border-white/5 bg-slate-950/40 flex items-center gap-2">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <Paperclip size={14} />
                  </button>
                  <input
                    type="text"
                    placeholder="Type message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-grow px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-blue-500 font-semibold"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ChatWidget;
