import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, File, X, Sparkles, CheckCircle2 } from 'lucide-react';

const UploadModal = ({ isOpen, onClose }) => {
  const [uploadState, setUploadState] = useState('idle'); // idle, processing, done
  const [lessonsCount, setLessonsCount] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;
    setUploadState('processing');
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setLessonsCount(data.count || 0);
        setUploadState('done');
      } else {
        alert("Upload failed: " + data.detail);
        setUploadState('idle');
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Make sure backend is running.");
      setUploadState('idle');
    }
  };

  const handleClose = () => {
    setUploadState('idle');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-card w-full max-w-xl p-1 rounded-[2rem] relative z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        
        <div className="bg-surface p-8 md:p-10 rounded-[1.8rem] relative z-10 h-[500px] flex flex-col justify-center">
          
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-text-muted"
          >
            <X size={20} />
          </button>

          <AnimatePresence mode="wait">
            
            {/* IDLE STATE */}
            {uploadState === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto bg-primary/20 rounded-3xl flex items-center justify-center mb-8 rotate-3">
                  <UploadCloud size={40} className="text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Feed Your Brain</h2>
                <p className="text-text-muted mb-8 max-w-sm mx-auto">
                  Upload notes, PDFs, or paste links. We'll break them into ADHD-friendly micro-lessons instantly.
                </p>

                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-white/20 rounded-3xl p-10 hover:bg-white/5 hover:border-primary/50 transition-colors cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    accept="application/pdf"
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                    className="hidden" 
                  />
                  <File size={32} className="mx-auto text-text-muted mb-4 group-hover:text-primary transition-colors" />
                  <p className="font-semibold text-white mb-1">Drag & drop a PDF here</p>
                  <p className="text-sm text-text-muted">or click to browse</p>
                </div>
              </motion.div>
            )}

            {/* PROCESSING STATE */}
            {uploadState === 'processing' && (
              <motion.div 
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center flex flex-col items-center justify-center h-full"
              >
                <div className="relative mb-10">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-4 border-white/10 border-t-primary border-r-accent-violet"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-accent-pink animate-pulse" size={32} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Analyzing Content...</h3>
                
                {/* Typing effect simulation */}
                <div className="h-6">
                  <motion.p 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-primary font-medium"
                  >
                    Breaking into 2-minute micro chunks...
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* DONE STATE */}
            {uploadState === 'done' && (
              <motion.div 
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-6 glow-success">
                  <CheckCircle2 size={48} className="text-success" />
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2">Magic Complete! ✨</h2>
                <p className="text-text-muted mb-8">We analyzed your PDF and generated {lessonsCount} micro-lessons.</p>
                
                <div className="grid grid-cols-1 gap-4 mb-8 text-left max-w-xs mx-auto">
                  <div className="glass-panel p-4 rounded-2xl border-success/20 bg-success/5 flex flex-col items-center">
                    <span className="text-xs text-success font-bold uppercase tracking-wider block mb-1">Generated</span>
                    <span className="text-lg font-bold text-white">{lessonsCount} Micro Lessons</span>
                  </div>
                </div>

                <button 
                  onClick={handleClose}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold transition-all glow-primary hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start New Momentum Plan
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
};

export default UploadModal;
