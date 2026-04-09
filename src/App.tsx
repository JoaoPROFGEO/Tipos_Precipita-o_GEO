import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CloudRain, Mountain, Sun, Wind, BookOpen, Info, ArrowRight, Play, Pause, RotateCcw, HelpCircle } from 'lucide-react';
import Frontal from './components/Frontal';
import Orografica from './components/Orografica';
import Convectiva from './components/Convectiva';
import Quiz from './components/Quiz';

const PRECIPITATION_TYPES = [
  {
    id: 'frontal',
    title: 'Precipitação Frontal',
    icon: <Wind className="w-5 h-5" />,
    steps: [
      { title: 'Encontro de Massas', desc: 'Duas massas de ar diferentes (uma Fria/Polar e outra Quente/Tropical) encontram-se.' },
      { title: 'Ascensão', desc: 'Como têm densidades diferentes, não se misturam logo. O ar quente (mais leve) é forçado a subir sobre o ar frio (mais pesado).' },
      { title: 'Arrefecimento e Saturação', desc: 'Ao subir, o ar quente arrefece. A humidade atinge o ponto de saturação, condensa e forma nuvens e chuva.' },
      { title: 'Na Realidade Portuguesa', desc: 'É a chuva clássica do nosso Inverno! Muito frequente no Norte e Centro de Portugal quando nos visitam as frentes da massa de ar polar.' }
    ],
    component: Frontal
  },
  {
    id: 'orografica',
    title: 'Precipitação Orográfica',
    icon: <Mountain className="w-5 h-5" />,
    steps: [
      { title: 'Barreira Física', desc: 'O vento húmido (vindo do oceano) encontra um obstáculo físico: uma montanha (barreira de condensação).' },
      { title: 'Ascensão Forçada', desc: 'Para conseguir passar, o ar é obrigado a subir a vertente da montanha.' },
      { title: 'Arrefecimento e Condensação', desc: 'À medida que sobe em altitude, a temperatura desce. O ar arrefece, o vapor de água condensa e chove na vertente exposta ao vento (barlavento).' },
      { title: 'Na Realidade Portuguesa', desc: 'Muito típica no Noroeste de Portugal (ex: Serra do Gerês, que é uma das zonas que mais chove no país!) e na encosta norte da Ilha da Madeira.' }
    ],
    component: Orografica
  },
  {
    id: 'convectiva',
    title: 'Precipitação Convectiva',
    icon: <Sun className="w-5 h-5" />,
    steps: [
      { title: 'Aquecimento Intenso', desc: 'A superfície terrestre muito quente aquece o ar em contacto com ela.' },
      { title: 'Ascensão Térmica', desc: 'O ar aquecido torna-se menos denso (leve) e sobe rapidamente, formando baixas pressões.' },
      { title: 'Condensação', desc: 'Ao subir, o ar arrefece, formando nuvens de grande desenvolvimento vertical (Cumulonimbus).' },
      { title: 'Na Realidade Portuguesa', desc: 'Dão origem a aguaceiros intensos e de curta duração. Típicas do Sul do país no verão. São aquelas famosas "trovoadas de fim de tarde" de verão que duram pouco mas chovem a potes!' }
    ],
    component: Convectiva
  }
];

const CONCEPTS = [
  { term: 'Precipitação frontal', definition: 'Resulta da subida do ar pelo encontro de uma massa de ar quente com uma massa de ar frio.' },
  { term: 'Precipitação orográfica', definition: 'Resulta da subida do ar pela existência de uma barreira montanhosa.' },
  { term: 'Barreira de condensação', definition: 'Obstáculo físico que obriga os ventos húmidos a subir, provocando condensação.' },
  { term: 'Precipitação convectiva', definition: 'Resulta do movimento ascendente do ar quente devido ao contacto com a superfície muito aquecida.' }
];

const TABS = [
  { id: 'frontal', title: 'Precipitação Frontal', icon: <Wind className="w-5 h-5" /> },
  { id: 'orografica', title: 'Precipitação Orográfica', icon: <Mountain className="w-5 h-5" /> },
  { id: 'convectiva', title: 'Precipitação Convectiva', icon: <Sun className="w-5 h-5" /> },
  { id: 'quiz', title: 'Quiz de Revisão', icon: <HelpCircle className="w-5 h-5" /> }
];

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeData = PRECIPITATION_TYPES.find(t => t.id === activeTab);
  const ActiveComponent = activeData?.component;

  // Reset progress when tab changes
  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
  }, [activeTab]);

  // Auto-play logic
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return p + 0.5; // Speed of auto-play
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Determine which step is active based on progress (0-24: step 0, 25-49: step 1, etc.)
  const activeStepIndex = Math.min(Math.floor(progress / 25), 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 pb-12">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-blue-700">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CloudRain className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Simulador de Precipitação</h1>
          </div>
          <div className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Geografia
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-xl shadow-sm border border-slate-200">
              {TABS.map(type => (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                    activeTab === type.id 
                      ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {type.icon}
                  {type.title}
                </button>
              ))}
            </div>

            {activeTab === 'quiz' ? (
              <Quiz />
            ) : activeData && ActiveComponent && (
              <>
                {/* Diagram Container */}
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 relative shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <ActiveComponent progress={progress} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Interactive Slider Controls */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md"
                title={isPlaying ? "Pausar" : "Reproduzir"}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <button
                onClick={() => { setProgress(0); setIsPlaying(false); }}
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                title="Reiniciar"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              
              <div className="flex-1 flex flex-col gap-2 px-2">
                <div className="flex justify-between text-xs font-bold text-slate-400 px-1">
                  <span>Início</span>
                  <span>Evolução do Processo</span>
                  <span>Fim</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={(e) => {
                    setProgress(Number(e.target.value));
                    setIsPlaying(false);
                  }}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div className="w-16 text-right font-mono font-bold text-blue-600 text-xl">
                {Math.round(progress)}%
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-500" />
                Como ocorre o processo?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeData.steps.map((step, idx) => {
                  const isActive = idx === activeStepIndex;
                  const isPast = idx < activeStepIndex;
                  
                  return (
                    <motion.div 
                      key={idx}
                      className={`p-4 rounded-xl border relative overflow-hidden transition-all duration-300 ${
                        isActive 
                          ? 'bg-blue-50 border-blue-300 shadow-md scale-[1.02]' 
                          : isPast 
                            ? 'bg-white border-slate-200 opacity-80' 
                            : 'bg-slate-50 border-slate-100 opacity-50 grayscale'
                      }`}
                    >
                      {isActive && <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs transition-colors ${
                          isActive ? 'bg-blue-600 text-white' : isPast ? 'bg-slate-200 text-slate-600' : 'bg-slate-200 text-slate-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <h3 className={`font-bold transition-colors ${isActive ? 'text-blue-900' : 'text-slate-700'}`}>{step.title}</h3>
                      </div>
                      <p className={`text-sm leading-relaxed pl-8 transition-colors ${isActive ? 'text-blue-800' : 'text-slate-500'}`}>
                        {step.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            </>
            )}
          </div>

          {/* Right Column: Concepts Dictionary */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg border border-slate-700 sticky top-24 text-white">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-300">
                <BookOpen className="w-6 h-6" />
                Conceitos Chave
              </h2>
              <div className="space-y-6">
                {CONCEPTS.map((concept, idx) => (
                  <div key={idx} className="group">
                    <dt className="font-bold text-blue-200 mb-1.5 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      {concept.term}
                    </dt>
                    <dd className="text-sm text-slate-300 leading-relaxed pl-6 border-l border-slate-700 ml-2">
                      {concept.definition}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
