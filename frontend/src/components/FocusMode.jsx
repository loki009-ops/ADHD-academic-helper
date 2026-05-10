import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Zap, CheckCircle2 } from 'lucide-react';

const FocusMode = ({ onExit }) => {
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    // Mock logic: option 1 is correct
    setIsCorrect(index === 1);
  };

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <button 
          onClick={onExit}
          className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors bg-black/5 hover:bg-black/10 px-4 py-2 rounded-xl"
        >
          <ArrowLeft size={18} />
          Exit Focus Mode
        </button>
        
        <div className="glass-card flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30">
          <Clock size={20} className={timeLeft < 60 ? "text-red-400 animate-pulse" : "text-primary"} />
          <span className="font-mono text-xl font-bold tracking-wider">{formatTime(timeLeft)}</span>
        </div>
      </header>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col"
      >
        <div className="flex items-center gap-2 mb-6">
          <Zap size={20} className="text-secondary" />
          <span className="text-secondary font-semibold uppercase tracking-widest text-sm">Micro Lesson 1/3</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
          What is the primary function of chloroplasts in a plant cell?
        </h2>

        <div className="space-y-4 mb-12">
          {[
            "To generate energy through cellular respiration",
            "To convert light energy into sugars (photosynthesis)",
            "To store water and nutrients",
            "To control what enters and exits the cell"
          ].map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-6 rounded-2xl border transition-all flex items-center justify-between text-lg
                ${selectedAnswer === null ? 'bg-surface hover:bg-black/5 border-black/10 cursor-pointer' : ''}
                ${selectedAnswer === index && isCorrect ? 'bg-green-500/20 border-green-500/50 cursor-default' : ''}
                ${selectedAnswer === index && !isCorrect ? 'bg-red-500/20 border-red-500/50 cursor-default' : ''}
                ${selectedAnswer !== null && selectedAnswer !== index && index === 1 ? 'bg-green-500/10 border-green-500/30 cursor-default' : ''}
                ${selectedAnswer !== null && selectedAnswer !== index && index !== 1 ? 'bg-surface/50 border-black/5 opacity-50 cursor-default' : ''}
              `}
            >
              <span>{option}</span>
              {selectedAnswer !== null && index === 1 && (
                <CheckCircle2 className="text-green-400" />
              )}
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl mb-8 border ${isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-primary/10 border-primary/30'}`}
          >
            <h3 className="font-bold text-lg mb-2">
              {isCorrect ? "Spot on! 🎯" : "Not quite, but close! 🧠"}
            </h3>
            <p className="text-text-muted">
              Chloroplasts contain chlorophyll and are responsible for capturing sunlight to create food (sugars) for the plant in a process called photosynthesis.
            </p>
          </motion.div>
        )}

        <div className="mt-auto flex justify-end">
          {selectedAnswer !== null && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary hover:bg-primary-hover text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-primary/20 transition-colors"
            >
              Next Question
            </motion.button>
          )}
        </div>
      </motion.main>
    </div>
  );
};

export default FocusMode;
