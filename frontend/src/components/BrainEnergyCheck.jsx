import React from 'react';
import { motion } from 'framer-motion';
import { Battery, BatteryLow, BatteryMedium, BatteryFull, Zap } from 'lucide-react';

const BrainEnergyCheck = ({ onSelect }) => {
  const options = [
    { id: 'burned_out', label: 'Burned Out', icon: BatteryLow, color: 'text-accent-pink', bg: 'bg-accent-pink/10', border: 'border-accent-pink/20', desc: 'Need gentle, easy wins' },
    { id: 'distracted', label: 'Distracted', icon: Battery, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', desc: 'Need high-structure, short tasks' },
    { id: 'normal', label: 'Normal', icon: BatteryMedium, color: 'text-accent-blue', bg: 'bg-accent-blue/10', border: 'border-accent-blue/20', desc: 'Ready for standard 5m chunks' },
    { id: 'locked_in', label: 'Locked In', icon: BatteryFull, color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', desc: 'Bring on the deep focus' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.08),transparent_70%)] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl z-10"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 text-primary mb-6 shadow-[0_0_30px_-5px_rgba(129,140,248,0.4)]"
          >
            <Zap size={32} />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How's your brain feeling?</h2>
          <p className="text-xl text-text-muted">We'll adapt the session to match your current energy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option, idx) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option.id)}
              className={`glass-panel p-6 rounded-2xl flex items-start gap-4 text-left transition-all hover:${option.bg} border ${option.border} hover:border-transparent group`}
            >
              <div className={`p-3 rounded-xl ${option.bg} ${option.color} group-hover:scale-110 transition-transform`}>
                <option.icon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{option.label}</h3>
                <p className="text-sm text-text-muted">{option.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-text-muted flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            No judgment. Just momentum.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BrainEnergyCheck;
