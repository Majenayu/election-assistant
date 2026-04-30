"use client";
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

const steps = [
  { title: "Voter Registration", desc: "Check your name in the electoral roll or apply via Form 6." },
  { title: "Know Your Candidates", desc: "Review criminal records, assets, and education via KYC app." },
  { title: "Find Polling Station", desc: "Locate your assigned booth using the Voter Helpline." },
  { title: "Voting Day", desc: "Carry valid ID. Get ink marked. Press button on EVM/VVPAT." },
  { title: "Result Declaration", desc: "Votes are counted and results announced by the ECI." },
];

export default function TimelineView() {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Election Journey</h2>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 h-full w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />
        
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`relative mb-12 flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="flex-1 md:w-1/2" />
            <div className="z-10 bg-white dark:bg-slate-900 p-2 rounded-full border-4 border-election-green">
              <CheckCircle2 className="text-election-green" />
            </div>
            <div className="flex-1 md:w-1/2 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 m-4">
              <h3 className="font-bold text-xl text-election-orange">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}