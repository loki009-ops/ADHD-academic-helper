import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, X, HeartHandshake, Coffee, Check, Zap, SkipForward, ArrowRight } from 'lucide-react';

const fallbackLessons = [
  {
    title: "The Water Cycle: Evaporation",
    reading: [
      "Evaporation is when the sun heats up water in rivers, lakes, or the ocean and turns it into vapor or steam.",
      "The water vapor or steam leaves the river, lake or ocean and goes into the air. This is the very first step of the cycle!"
    ],
    question: "Quick Check: What causes water to turn into vapor?",
    options: ["Wind blowing across the ocean", "The sun heating the water", "Fish swimming really fast", "The moon pulling the tide"],
    correctAnswer: 1
  },
  {
    title: "The Water Cycle: Condensation",
    reading: [
      "As water vapor rises higher into the sky, the air gets cooler.",
      "This cold air causes the water vapor to turn back into tiny liquid water droplets, forming clouds. This is called condensation."
    ],
    question: "Quick Check: What happens during condensation?",
    options: ["Water turns into ice", "Water vapor forms clouds", "Clouds produce rain", "Water boils"],
    correctAnswer: 1
  },
  {
    title: "The Water Cycle: Precipitation",
    reading: [
      "When clouds get too heavy with water droplets, the water falls back to Earth.",
      "It can fall as rain, snow, sleet, or hail. This process is called precipitation."
    ],
    question: "Quick Check: Which of these is a form of precipitation?",
    options: ["Evaporation", "Clouds", "Snow", "Sunlight"],
    correctAnswer: 2
  },
  {
    title: "Photosynthesis: The Basics",
    reading: [
      "Photosynthesis is the process by which plants make their own food.",
      "They use sunlight, water, and carbon dioxide from the air to create glucose (sugar) and release oxygen."
    ],
    question: "Quick Check: What do plants release into the air during photosynthesis?",
    options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Water vapor"],
    correctAnswer: 1
  },
  {
    title: "Photosynthesis: Chlorophyll",
    reading: [
      "Plants are green because of a special pigment called chlorophyll.",
      "Chlorophyll lives in the chloroplasts and is responsible for trapping the sunlight needed for photosynthesis."
    ],
    question: "Quick Check: Why are most leaves green?",
    options: ["They reflect the sky", "They absorb green light", "They contain chlorophyll", "They are painted by nature"],
    correctAnswer: 2
  },
  {
    title: "Cell Structure: Nucleus",
    reading: [
      "The nucleus is often called the 'brain' or 'control center' of the cell.",
      "It contains the cell's DNA, which holds the instructions for building proteins and making the cell function."
    ],
    question: "Quick Check: What important molecule is stored inside the nucleus?",
    options: ["DNA", "Chlorophyll", "Glucose", "Water"],
    correctAnswer: 0
  },
  {
    title: "Cell Structure: Mitochondria",
    reading: [
      "Mitochondria are known as the 'powerhouses' of the cell.",
      "They take nutrients and break them down to create energy-rich molecules for the cell to use."
    ],
    question: "Quick Check: What is the main job of the mitochondria?",
    options: ["Storing water", "Making energy", "Protecting the cell", "Creating DNA"],
    correctAnswer: 1
  },
  {
    title: "Solar System: The Sun",
    reading: [
      "The Sun is a yellow dwarf star at the center of our solar system.",
      "It is mostly made of hydrogen and helium, and its massive gravity holds the entire solar system together."
    ],
    question: "Quick Check: What two gases make up most of the Sun?",
    options: ["Oxygen and Carbon", "Hydrogen and Helium", "Nitrogen and Oxygen", "Iron and Nickel"],
    correctAnswer: 1
  },
  {
    title: "Solar System: Gravity",
    reading: [
      "Gravity is an invisible force that pulls objects toward each other.",
      "Earth's gravity is what keeps you on the ground and what makes things fall. The heavier an object, the stronger its gravitational pull."
    ],
    question: "Quick Check: What does gravity do?",
    options: ["Pushes things away", "Pulls objects together", "Makes things hot", "Creates wind"],
    correctAnswer: 1
  },
  {
    title: "Human Body: The Heart",
    reading: [
      "Your heart is a muscular organ about the size of your fist.",
      "It pumps blood throughout your body. The right side pumps blood to the lungs to get oxygen, and the left side pumps it to the rest of the body."
    ],
    question: "Quick Check: What is the main function of the heart?",
    options: ["Digesting food", "Pumping blood", "Breathing air", "Thinking"],
    correctAnswer: 1
  },
  {
    title: "Human Body: Lungs",
    reading: [
      "Your lungs are the main organs of your respiratory system.",
      "When you breathe in, they take oxygen from the air and move it into your bloodstream. When you breathe out, they expel carbon dioxide."
    ],
    question: "Quick Check: What gas do your lungs remove when you breathe out?",
    options: ["Oxygen", "Helium", "Carbon dioxide", "Nitrogen"],
    correctAnswer: 2
  },
  {
    title: "Physics: Newton's First Law",
    reading: [
      "Newton's First Law states that an object at rest stays at rest, and an object in motion stays in motion...",
      "...unless acted upon by an unbalanced force. This tendency to resist changes in motion is called inertia."
    ],
    question: "Quick Check: What is the tendency of an object to resist changes in its motion called?",
    options: ["Gravity", "Friction", "Inertia", "Velocity"],
    correctAnswer: 2
  },
  {
    title: "Physics: Kinetic Energy",
    reading: [
      "Energy can exist in many forms. Kinetic energy is the energy of motion.",
      "Any object that is moving—like a rolling ball or a flying airplane—has kinetic energy."
    ],
    question: "Quick Check: Kinetic energy is the energy of...",
    options: ["Light", "Heat", "Position", "Motion"],
    correctAnswer: 3
  },
  {
    title: "Chemistry: Atoms",
    reading: [
      "Atoms are the basic building blocks of all matter. Everything around you is made of atoms.",
      "They are composed of three tiny particles: protons, neutrons, and electrons."
    ],
    question: "Quick Check: Which of these is NOT a part of an atom?",
    options: ["Proton", "Neutron", "Molecule", "Electron"],
    correctAnswer: 2
  },
  {
    title: "Chemistry: States of Matter",
    reading: [
      "Matter generally exists in three common states on Earth: solid, liquid, and gas.",
      "Solids have a fixed shape, liquids take the shape of their container, and gases spread out to fill any available space."
    ],
    question: "Quick Check: Which state of matter takes the shape of its container but has a fixed volume?",
    options: ["Solid", "Liquid", "Gas", "Plasma"],
    correctAnswer: 1
  },
  {
    title: "Biology: DNA",
    reading: [
      "DNA stands for Deoxyribonucleic Acid. It is the molecule that carries genetic information for the development and functioning of an organism.",
      "Its shape is a famous double helix, which looks like a twisted ladder."
    ],
    question: "Quick Check: What shape is a DNA molecule?",
    options: ["A perfect circle", "A twisted ladder (double helix)", "A straight line", "A square"],
    correctAnswer: 1
  },
  {
    title: "Biology: Ecosystems",
    reading: [
      "An ecosystem is a geographic area where plants, animals, and other organisms, as well as weather and landscape, work together to form a bubble of life.",
      "Every part of an ecosystem depends on every other part."
    ],
    question: "Quick Check: What makes up an ecosystem?",
    options: ["Only animals", "Only plants", "Living things and their environment", "Only weather"],
    correctAnswer: 2
  },
  {
    title: "Earth Science: Tectonic Plates",
    reading: [
      "The Earth's outer shell is divided into several hard plates that glide over the mantle.",
      "These plates move incredibly slowly. When they collide, pull apart, or scrape against each other, they cause earthquakes and create mountains."
    ],
    question: "Quick Check: What happens when tectonic plates interact?",
    options: ["The weather changes", "Earthquakes and mountains can form", "The oceans dry up", "It starts to rain"],
    correctAnswer: 1
  },
  {
    title: "Earth Science: Volcanoes",
    reading: [
      "A volcano is an opening in the Earth's crust that allows molten rock, gases, and debris to escape to the surface.",
      "When the molten rock is underground, it is called magma. When it erupts to the surface, it is called lava."
    ],
    question: "Quick Check: What is molten rock called when it erupts onto the Earth's surface?",
    options: ["Magma", "Lava", "Ash", "Crust"],
    correctAnswer: 1
  },
  {
    title: "Space: Black Holes",
    reading: [
      "A black hole is a place in space where gravity pulls so much that even light cannot get out.",
      "The gravity is so strong because matter has been squeezed into a tiny space. This can happen when a massive star is dying."
    ],
    question: "Quick Check: Why can't light escape a black hole?",
    options: ["It is too dark", "The gravity is too strong", "It gets reflected", "The space is empty"],
    correctAnswer: 1
  }
];

const MomentumMode = ({ onExit }) => {
  const [dbLessons, setDbLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isActive, setIsActive] = useState(true);
  const [taskState, setTaskState] = useState('reading'); // reading, quiz, success
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [earnedXp, setEarnedXp] = useState(50);
  const [totalXp, setTotalXp] = useState(1250);

  useEffect(() => {
    fetch('http://localhost:8000/api/lessons')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setDbLessons(data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch lessons:", err);
        setIsLoading(false);
      });
  }, []);

  const activeLessons = dbLessons.length > 0 ? dbLessons : fallbackLessons.slice(0, 10);
  const currentLesson = activeLessons[currentLessonIndex % activeLessons.length];

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && taskState === 'reading') {
      setTaskState('quiz');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, taskState]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (idx) => {
    setSelectedAnswer(idx);
    
    if (idx === currentLesson.correctAnswer) {
      setTotalXp(prev => prev + earnedXp);
      setTimeout(() => {
        setTaskState('success');
      }, 1000);
    } else {
      // Increased penalty for wrong answer
      setEarnedXp(prev => Math.max(0, prev - 25)); // Deduct 25 XP
      setTimeout(() => {
        setSelectedAnswer(null);
      }, 800);
    }
  };

  const nextTask = () => {
    setCurrentLessonIndex(prev => prev + 1);
    setTaskState('reading');
    setSelectedAnswer(null);
    setTimeLeft(120);
    setIsActive(true);
    setEarnedXp(50);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">
      {/* Immersive calming background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.05),transparent_60%)] pointer-events-none" />

      {/* Top Bar */}
      <header className="w-full p-6 flex justify-between items-center z-10 relative">
        <button 
          onClick={onExit}
          className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
          <span className="font-bold tracking-widest text-white uppercase text-sm">Momentum Mode</span>
        </div>

        <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2 text-warning border border-warning/20">
          <Zap size={16} /> <span className="font-bold">{totalXp} XP</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-3xl mx-auto">
        {isLoading ? (
          <div className="text-white text-xl font-bold flex items-center gap-3">
            <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            Loading your personalized lessons...
          </div>
        ) : (
          <AnimatePresence mode="wait">
          
          {/* READING STATE */}
          {taskState === 'reading' && (
            <motion.div
              key="reading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-6xl md:text-8xl font-black text-white mb-12 tracking-tight drop-shadow-2xl font-mono">
                {formatTime(timeLeft)}
              </div>
              
              <div className="glass-card w-full p-8 md:p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Micro Lesson {(currentLessonIndex % activeLessons.length) + 1}/{activeLessons.length}</span>
                <h2 className="text-3xl font-bold text-white mb-6 leading-tight">{currentLesson.title}</h2>
                <div className="space-y-4 text-lg text-text-muted leading-relaxed mb-8">
                  {currentLesson.reading.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <button 
                  onClick={() => setTaskState('quiz')}
                  className="w-full sm:w-auto bg-primary/10 hover:bg-primary/20 border border-primary/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={18} className="text-primary" />
                  I'm ready for the Quiz
                </button>
              </div>
            </motion.div>
          )}

          {/* QUIZ STATE */}
          {taskState === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full"
            >
              <div className="glass-card w-full p-8 md:p-12 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-blue/20 text-accent-blue">
                    <Zap size={24} />
                  </div>
                  <motion.div 
                    key={earnedXp}
                    initial={{ scale: 1.2, y: -5 }}
                    animate={{ scale: 1, y: 0 }}
                    className="text-warning font-bold flex items-center gap-1 bg-black/20 px-4 py-2 rounded-xl border border-white/5"
                  >
                    <Zap size={18} /> Potential: {earnedXp} XP
                  </motion.div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-8">{currentLesson.question}</h2>
                
                <div className="space-y-4">
                  {currentLesson.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left p-6 rounded-2xl border text-lg font-medium transition-all ${
                        selectedAnswer === idx 
                          ? (idx === currentLesson.correctAnswer ? 'bg-success/20 border-success text-white glow-success' : 'bg-accent-pink/20 border-accent-pink text-white')
                          : 'glass-panel hover:bg-white/10 hover:border-white/20 text-text-muted hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* SUCCESS STATE */}
          {taskState === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-32 h-32 bg-success rounded-full flex items-center justify-center glow-success mb-8 relative z-10"
                >
                  <Check size={64} className="text-white" />
                </motion.div>
                {/* Confetti effect placeholder */}
                <div className="absolute inset-0 bg-success/20 rounded-full blur-2xl animate-ping" />
              </div>
              
              <h2 className="text-5xl font-black text-white mb-4">Nailed it!</h2>
              <p className="text-xl text-success font-bold mb-12">+{earnedXp} XP Earned</p>
              
              <button 
                onClick={nextTask}
                className="bg-primary hover:bg-primary-hover text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all glow-primary hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                Next Micro Mission <ArrowRight size={24} />
              </button>
            </motion.div>
          )}

        </AnimatePresence>
        )}
      </main>

      {/* Bottom Actions */}
      <footer className="w-full p-6 flex justify-center gap-4 z-10 relative">
        <button className="glass-button px-6 py-3 rounded-xl flex items-center gap-2 text-text-muted hover:text-white">
          <HeartHandshake size={18} />
          I'm Stuck
        </button>
        <button 
          onClick={() => setIsActive(!isActive)}
          className="glass-button px-6 py-3 rounded-xl flex items-center gap-2 text-text-muted hover:text-white"
        >
          {isActive ? <Pause size={18} /> : <Play size={18} />}
          {isActive ? 'Pause' : 'Resume'}
        </button>
        <button className="glass-button px-6 py-3 rounded-xl flex items-center gap-2 text-text-muted hover:text-white">
          <Coffee size={18} />
          Tiny Break
        </button>
        <button 
          onClick={nextTask}
          className="glass-button px-6 py-3 rounded-xl flex items-center gap-2 text-text-muted hover:text-white"
        >
          <SkipForward size={18} />
          Skip
        </button>
      </footer>
    </div>
  );
};

export default MomentumMode;
