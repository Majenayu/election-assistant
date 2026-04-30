"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ElectionSimulator() {
  const [stats, setStats] = useState({ support: 50, budget: 1000, trust: 60 });
  const [history, setHistory] = useState<string[]>(["Campaign Started!"]);

  const makeChoice = (impact: any, log: string) => {
    setStats(prev => ({
      support: Math.min(100, prev.support + impact.support),
      budget: prev.budget + impact.budget,
      trust: Math.min(100, prev.trust + impact.trust)
    }));
    setHistory([log, ...history]);
  };

  return (
    <div className="min-h-screen p-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-election-orange to-election-green">
          Candidate Simulator 2024
        </h1>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Object.entries(stats).map(([k, v]) => (
            <div key={k} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-md border-b-4 border-election-blue">
              <p className="uppercase text-xs font-bold opacity-60">{k}</p>
              <p className="text-2xl font-black">{v}{k === 'budget' ? 'k' : '%'}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Campaign Decisions</h2>
            <button 
              onClick={() => makeChoice({support: 10, budget: -200, trust: -5}, "Hosted a massive rally (+Support, -Budget, -Local Trust)")}
              className="w-full p-4 text-left bg-white dark:bg-slate-900 hover:border-election-orange border-2 rounded-xl transition"
            >
              Organize Mega Rally
            </button>
            <button 
              onClick={() => makeChoice({support: 5, budget: -50, trust: 15}, "Door-to-door awareness campaign (+Trust, +Support)")}
              className="w-full p-4 text-left bg-white dark:bg-slate-900 hover:border-election-green border-2 rounded-xl transition"
            >
              Door-to-Door Canvassing
            </button>
          </div>
          
          <div className="bg-slate-900 text-green-400 p-6 rounded-xl font-mono text-sm h-64 overflow-y-auto shadow-inner">
            <p className="text-white mb-2 underline">Campaign Log:</p>
            {history.map((h, i) => <p key={i}>&gt; {h}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}