import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BatteryMedium } from 'lucide-react';

const RecoveryMode = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_60%)] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full z-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 mx-auto bg-accent-blue/20 rounded-3xl flex items-center justify-center mb-8 glow-primary"
        >
          <Sparkles size={40} className="text-accent-blue" />
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Welcome back.
        </h2>
        
        <p className="text-xl text-text-muted mb-12">
          Let's restart with a simple, 2-minute win. No pressure, just momentum.
        </p>

        <div className="glass-card p-6 rounded-3xl mb-12 text-left flex items-center justify-between border-accent-blue/30 bg-accent-blue/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-blue/20 flex items-center justify-center">
              <BatteryMedium size={24} className="text-accent-blue" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Easy Start: Review</h3>
              <p className="text-text-muted text-sm">2 mins • +50 XP</p>
            </div>
          </div>
        </div>

        <button 
          onClick={onStart}
          className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all glow-primary hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto"
        >
          Start 2-Minute Win <ArrowRight size={24} />
        </button>
      </motion.div>
    </div>
  );
};

export default RecoveryMode;
