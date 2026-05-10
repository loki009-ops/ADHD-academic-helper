import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Play, ArrowRight, Zap, Target } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center z-10 glass-panel border-b-0 border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2.5 rounded-xl border border-primary/30 glow-primary">
            <BrainCircuit size={24} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">FocusFlow</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-text-muted hover:text-white transition-colors font-medium">Log in</button>
          <button 
            onClick={onGetStarted}
            className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-semibold transition-all glow-primary"
          >
            Start Momentum Mode
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-white/10 mb-8">
            <Sparkles size={16} className="text-accent-pink" />
            <span className="text-sm font-medium text-white/80">AI-Powered ADHD Companion</span>
          </div>

          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-tight">
            Studying with ADHD is hard. <br/>
            <span className="text-gradient">Starting shouldn't be.</span>
          </h2>

          <p className="text-xl text-text-muted mb-10 max-w-2xl leading-relaxed">
            Break task paralysis with 2-minute micro-lessons. Experience a dopamine-driven, visually calm study environment that adapts to your brain's energy levels.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button 
              onClick={onGetStarted}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all glow-primary hover:scale-105 active:scale-95"
            >
              <Zap size={22} />
              Start Momentum Mode
            </button>
            <button className="glass-button px-8 py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-2">
              <Play size={22} className="text-accent-blue" />
              See Demo
            </button>
          </div>
        </motion.div>

        {/* Feature Cards Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full"
        >
          {[
            { title: "2-Minute Micro Chunks", icon: Zap, color: "text-accent-blue", bg: "bg-accent-blue/10" },
            { title: "Adaptive Focus Sessions", icon: Target, color: "text-primary", bg: "bg-primary/10" },
            { title: "Dopamine-Driven Rewards", icon: Sparkles, color: "text-accent-pink", bg: "bg-accent-pink/10" }
          ].map((feature, idx) => (
            <div key={idx} className="glass-card p-6 rounded-3xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} className={feature.color} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-text-muted text-sm">Designed specifically to lower the barrier of entry and keep your momentum going.</p>
            </div>
          ))}
        </motion.div>
      </main>
      
      {/* Floating Particles (Simplified for React) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      </div>
    </div>
  );
};

export default LandingPage;
