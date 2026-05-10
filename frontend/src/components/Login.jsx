import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

const Login = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card max-w-md w-full p-8 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="flex justify-center mb-6">
          <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20">
            <BrainCircuit size={32} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2">Welcome to FocusFlow</h2>
        <p className="text-text-muted text-center mb-8">Hyper-focused learning for your ADHD brain.</p>
        
        <div className="space-y-4">
          <button 
            onClick={onLogin}
            className="w-full bg-primary hover:bg-primary-hover transition-colors text-white font-semibold py-3 rounded-xl flex justify-center items-center gap-2"
          >
            Continue to Dashboard
          </button>
          
          <p className="text-xs text-center text-text-muted mt-6">
            User isolation and authentication will be implemented here soon (e.g. Supabase Auth).
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
