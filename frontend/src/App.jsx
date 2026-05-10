import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import RecoveryMode from './components/RecoveryMode';
import BrainEnergyCheck from './components/BrainEnergyCheck';
import Dashboard from './components/Dashboard';
import MomentumMode from './components/MomentumMode';
import UploadModal from './components/UploadModal';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // landing, auth, recovery, energy, dashboard, momentum
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [globalXp, setGlobalXp] = useState(1250);

  // Simulating a condition for returning users
  const isReturningAfterLongBreak = true; 

  const handleLogin = () => {
    if (isReturningAfterLongBreak) {
      setCurrentView('recovery');
    } else {
      setCurrentView('energy');
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-primary/30">
      
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <LandingPage key="landing" onGetStarted={() => setCurrentView('auth')} />
        )}

        {currentView === 'auth' && (
          <AuthPage key="auth" onLogin={handleLogin} />
        )}

        {currentView === 'recovery' && (
          <RecoveryMode key="recovery" onStart={() => setCurrentView('dashboard')} />
        )}

        {currentView === 'energy' && (
          <BrainEnergyCheck key="energy" onSelect={(energyLevel) => setCurrentView('dashboard')} />
        )}

        {currentView === 'dashboard' && (
          <Dashboard 
            key="dashboard"
            globalXp={globalXp}
            onStartFocus={() => setCurrentView('momentum')} 
            onOpenUpload={() => setIsUploadOpen(true)} 
          />
        )}

        {currentView === 'momentum' && (
          <MomentumMode 
            key="momentum" 
            globalXp={globalXp} 
            setGlobalXp={setGlobalXp} 
            onExit={() => setCurrentView('dashboard')} 
          />
        )}
      </AnimatePresence>

      {/* Global Modals */}
      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
      />

    </div>
  );
}

export default App;
