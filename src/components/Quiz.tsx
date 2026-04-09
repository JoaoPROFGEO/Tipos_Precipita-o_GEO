import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Award, RotateCcw, HelpCircle, ArrowRight } from 'lucide-react';

const QUESTIONS = [
  {
    question: "Em Portugal, no Inverno, que tipo de precipitação é a grande responsável pelos nossos dias de chuva contínua?",
    options: ["Precipitação Orográfica", "Precipitação Frontal", "Precipitação Convectiva"],
    correct: 1
  },
  {
    question: "Foste passar férias ao Alentejo em agosto. De repente, a meio de uma tarde muito quente, formam-se nuvens altas e cai um aguaceiro forte com trovoada. Que tipo de precipitação foi esta?",
    options: ["Precipitação Convectiva", "Precipitação Frontal", "Precipitação Orográfica"],
    correct: 0
  },
  {
    question: "Porque é que a Serra do Gerês é uma das zonas mais chuvosas de Portugal Continental?",
    options: ["Porque está no Sul e apanha muito sol.", "Porque a montanha obriga os ventos húmidos do oceano a subir, arrefecer e condensar.", "Porque as massas de ar quente e frio adoram encontrar-se lá."],
    correct: 1
  },
  {
    question: "Na precipitação orográfica, como se chama a vertente da montanha exposta ao vento húmido, onde ocorre a condensação e a chuva?",
    options: ["Sotavento", "Barlavento", "Vertente Seca"],
    correct: 1
  },
  {
    question: "Na precipitação frontal, porque é que o ar quente é forçado a subir quando encontra o ar frio?",
    options: ["Porque o ar quente é mais pesado (mais denso) do que o ar frio.", "Porque o vento empurra o ar quente para cima.", "Porque o ar quente é mais leve (menos denso) do que o ar frio."],
    correct: 2
  },
  {
    question: "Qual destas nuvens está tipicamente associada à precipitação convectiva (comuns nas fortes trovoadas de verão)?",
    options: ["Nuvens de desenvolvimento vertical (Cumulonimbus).", "Nuvens muito finas e altas (Cirrus).", "Nuvens baixas em forma de nevoeiro (Stratus)."],
    correct: 0
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === QUESTIONS[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Quiz de Revisão</h2>
      </div>

      <AnimatePresence mode="wait">
        {showScore ? (
          <motion.div
            key="score"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 text-yellow-600 mb-6">
              <Award className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Quiz Concluído!</h3>
            <p className="text-lg text-slate-600 mb-8">
              Acertaste em <span className="font-bold text-indigo-600">{score}</span> de <span className="font-bold">{QUESTIONS.length}</span> perguntas.
            </p>
            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Tentar Novamente
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4 text-sm font-bold text-slate-400">
                <span>Pergunta {currentQuestion + 1} de {QUESTIONS.length}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 leading-relaxed">
                {QUESTIONS[currentQuestion].question}
              </h3>
            </div>

            <div className="space-y-3">
              {QUESTIONS[currentQuestion].options.map((option, index) => {
                const isCorrect = index === QUESTIONS[currentQuestion].correct;
                const isSelected = index === selectedAnswer;
                
                let buttonClass = "w-full text-left p-4 rounded-xl border-2 font-semibold transition-all duration-200 flex items-center justify-between ";
                
                if (!isAnswered) {
                  buttonClass += "border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50";
                } else {
                  if (isCorrect) {
                    buttonClass += "border-green-500 bg-green-50 text-green-800";
                  } else if (isSelected) {
                    buttonClass += "border-red-500 bg-red-50 text-red-800";
                  } else {
                    buttonClass += "border-slate-200 text-slate-400 opacity-50";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={buttonClass}
                  >
                    <span>{option}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex justify-end"
              >
                <button
                  onClick={nextQuestion}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  {currentQuestion + 1 === QUESTIONS.length ? 'Ver Resultados' : 'Próxima Pergunta'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
