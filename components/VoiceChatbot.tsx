"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, Volume2, X } from 'lucide-react';

export default function VoiceChatbot({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [input, setInput] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window)) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
        setIsListening(false);
      };
      recognitionRef.current = recognition;
    }
  }, [lang]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (text: string) => {
    const userMsg = text || input;
    if (!userMsg) return;

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: userMsg, language: lang }),
    });
    const data = await res.json();
    setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
    speak(data.response);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-80 md:w-96 mb-4 overflow-hidden flex flex-col h-[500px]"
          >
            <div className="bg-gradient-to-r from-election-orange to-election-green p-4 text-white flex justify-between items-center">
              <span className="font-bold flex items-center gap-2"><Volume2 size={20}/> VoteIQ AI</span>
              <button onClick={() => setIsOpen(false)}><X size={20}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${m.role === 'user' ? 'bg-election-orange text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-800 rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t dark:border-slate-800 flex gap-2">
              <button 
                onClick={() => {
                  setIsListening(!isListening);
                  isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
                }}
                className={`p-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'}`}
              >
                {isListening ? <MicOff size={20}/> : <Mic size={20}/>}
              </button>
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full px-4 text-sm outline-none"
                placeholder="Ask anything..."
              />
              <button onClick={() => handleSend(input)} className="text-election-green"><Send/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-election-orange p-4 rounded-full shadow-lg text-white"
      >
        <Mic size={32} />
      </motion.button>
    </div>
  );
}