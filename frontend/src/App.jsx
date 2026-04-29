import { motion } from 'framer-motion'
import { BrainCircuit, CheckCircle2, PlayCircle, Library } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-background text-white font-sans p-6 md:p-12">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl">
            <BrainCircuit size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">FocusFlow</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-400">Daily Streak</span>
            <span className="font-bold text-secondary">🔥 3 Days</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface border-2 border-primary flex items-center justify-center overflow-hidden">
            <span className="text-sm font-bold">AJ</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        
        {/* Welcome & Magic Button */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-3xl p-8 border border-white/5 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Welcome back, Aju! 👋</h2>
            <p className="text-gray-400 mb-8 max-w-lg">
              You've crushed 12 micro-lessons this week. Ready to keep the momentum going?
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary hover:bg-indigo-500 transition-colors px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                <PlayCircle size={20} />
                Continue Last Topic
              </button>
              <button className="bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                <Library size={20} />
                Upload New Notes
              </button>
            </div>
          </div>
          
          {/* Decorative background element */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        </motion.section>

        {/* The "Done" List / Momentum Tracker */}
        <section>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-green-400" />
            Today's Momentum
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Water Cycle Basics", time: "3 mins", type: "Video" },
              { title: "Photosynthesis MCQ", time: "2 mins", type: "Quiz" },
              { title: "Cell Structure", time: "5 mins", type: "Reading" }
            ].map((task, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="bg-surface p-5 rounded-2xl border border-white/5 opacity-70 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-secondary mb-1 block uppercase tracking-wider">{task.type}</span>
                  <h4 className="font-medium text-lg">{task.title}</h4>
                </div>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                  <span>{task.time}</span>
                  <CheckCircle2 size={16} className="text-green-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}

export default App
