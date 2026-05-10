import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Mail, Lock, ArrowRight } from 'lucide-react';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Left Panel - Visuals */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between p-12 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-background z-0" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="bg-primary p-2 rounded-xl">
              <BrainCircuit size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">FocusFlow</h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md"
          >
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Your brain works differently. <br/>
              <span className="text-text-muted">Your tools should too.</span>
            </h2>
            <p className="text-lg text-text-muted">
              Join thousands of ADHD learners turning task paralysis into unstoppable momentum.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 z-10 relative">
        <div className="absolute inset-0 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-12">
            <div className="bg-primary p-2 rounded-xl">
              <BrainCircuit size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">FocusFlow</h1>
          </div>

          <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
            
            <h2 className="text-2xl font-bold text-white mb-2">{isLogin ? 'Welcome back' : 'Start your journey'}</h2>
            <p className="text-text-muted mb-8">{isLogin ? 'Log in to continue your momentum.' : 'Create an account to track your progress.'}</p>
            
            <button className="w-full glass-button py-3.5 rounded-xl flex items-center justify-center gap-3 text-white font-medium mb-6 hover:bg-white/10 transition-colors">
              <Mail size={20} />
              Continue with Google
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs text-text-muted uppercase tracking-wider">or</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
              <div>
                <label className="text-sm font-medium text-text-muted mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-text-muted mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold mt-4 flex items-center justify-center gap-2 transition-all glow-primary hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLogin ? 'Log In' : 'Sign Up'}
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="text-center text-text-muted text-sm mt-8">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:text-primary-hover font-medium transition-colors">
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
