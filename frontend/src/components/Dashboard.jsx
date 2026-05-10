import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Play, Zap, Flame, Target, Trophy, Clock, ArrowRight, Library, Sparkles } from 'lucide-react';

const Dashboard = ({ onStartFocus, onOpenUpload, globalXp = 1250 }) => {
  const [missions, setMissions] = useState([
    { id: 1, title: "Water Cycle Quick Win", time: "2 mins", xp: 50, type: "⚡ Quick Win", completed: false, energy: "Low" },
    { id: 2, title: "Photosynthesis Deep Dive", time: "5 mins", xp: 120, type: "🧠 Deep Focus", completed: false, energy: "High" },
    { id: 3, title: "Cell Structure Review", time: "3 mins", xp: 75, type: "🔥 Streak Saver", completed: false, energy: "Med" }
  ]);

  const toggleMission = (id) => {
    setMissions(missions.map(m => 
      m.id === id ? { ...m, completed: !m.completed } : m
    ));
  };

  const completedCount = missions.filter(m => m.completed).length;
  const progressPercent = Math.round((completedCount / missions.length) * 100);

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      {/* Clean background */}

      {/* Header */}
      <header className="max-w-5xl mx-auto flex justify-between items-center mb-10 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2.5 rounded-xl border border-primary/30 glow-primary">
            <BrainCircuit size={24} className="text-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">FocusFlow</h1>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6 glass-panel px-4 py-2 rounded-2xl">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-streak" />
            <span className="font-bold text-white">4<span className="text-text-muted text-xs ml-1">days</span></span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-warning" />
            <span className="font-bold text-white">{globalXp.toLocaleString()}<span className="text-text-muted text-xs ml-1">xp</span></span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-sm text-white shadow-lg">
            U
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Main Hero Card */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6 md:p-10 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 mb-6 text-sm font-medium text-white">
                <Sparkles size={16} className="text-accent-pink" />
                Level 4 Scholar
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                You're on a roll, Student! 🌊
              </h2>
              <p className="text-text-muted text-lg mb-8 max-w-md">
                Your momentum is high. Just 2 minutes to keep your streak alive today.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={onStartFocus}
                  className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all glow-primary hover:scale-105 active:scale-95 group"
                >
                  <Play size={20} className="fill-current" />
                  Continue Momentum
                </button>
                <button 
                  onClick={onOpenUpload}
                  className="glass-button px-6 py-4 rounded-2xl font-semibold flex items-center gap-2 text-white"
                >
                  <Library size={20} className="text-text-muted" />
                  Add Notes
                </button>
              </div>
            </div>

            {/* Progress Ring */}
            <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" className="stroke-white/10 fill-none stroke-[8]" />
                <motion.circle 
                  cx="50" cy="50" r="40" 
                  className="stroke-success fill-none stroke-[8] stroke-linecap-round"
                  initial={{ strokeDasharray: "251.2", strokeDashoffset: "251.2" }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * progressPercent) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{progressPercent}%</span>
                <span className="text-xs text-text-muted uppercase tracking-wider font-medium">Momentum</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Micro Missions Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Target size={24} className="text-primary" />
              Today's Micro Missions
            </h3>
            <span className="text-sm font-medium text-text-muted bg-white/5 px-3 py-1 rounded-full">
              {completedCount}/{missions.length} Done
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {missions.map((mission, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={mission.id} 
                onClick={() => toggleMission(mission.id)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden ${
                  mission.completed 
                    ? 'bg-success/10 border-success/30 glow-success' 
                    : 'glass-panel hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {/* Active glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1 ${
                    mission.completed ? 'bg-success/20 text-success' : 'bg-white/10 text-white'
                  }`}>
                    {mission.type}
                  </span>
                  {mission.completed && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Zap size={20} className="text-success fill-success" />
                    </motion.div>
                  )}
                </div>
                
                <h4 className={`text-xl font-bold mb-6 transition-colors relative z-10 ${
                  mission.completed ? 'text-success/80 line-through' : 'text-white'
                }`}>
                  {mission.title}
                </h4>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-sm text-text-muted bg-black/20 px-2 py-1 rounded-md">
                      <Clock size={14} /> {mission.time}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-text-muted bg-black/20 px-2 py-1 rounded-md">
                      <Trophy size={14} className="text-warning" /> +{mission.xp}
                    </span>
                  </div>
                  {!mission.completed && (
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
