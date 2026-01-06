
import React, { useState, useEffect } from 'react';
import { generateExercise } from '../services/geminiService';
import { AnalysisResult, SentenceRole, UserProgress } from '../types';

interface TrainerProps {
  onProgressUpdate: (update: Partial<UserProgress>) => void;
}

const Trainer: React.FC<TrainerProps> = ({ onProgressUpdate }) => {
  const [exercise, setExercise] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedWordIdx, setSelectedWordIdx] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<SentenceRole | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);

  const fetchNewExercise = async () => {
    setLoading(true);
    setFeedback(null);
    setSelectedWordIdx(null);
    setSelectedRole(null);
    try {
      const ex = await generateExercise();
      setExercise(ex);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewExercise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheck = () => {
    if (selectedWordIdx === null || !selectedRole || !exercise) return;

    const correctRole = exercise.analysis[selectedWordIdx].role;
    const isCorrect = selectedRole === correctRole;

    if (isCorrect) {
      setScore(s => s + 1);
      onProgressUpdate({ correctAnswers: 1, totalQuestions: 1, experience: 20 });
      setFeedback({ isCorrect: true, message: 'Керемет! Дұрыс таптыңыз.' });
    } else {
      onProgressUpdate({ totalQuestions: 1 });
      setFeedback({ 
        isCorrect: false, 
        message: `Қате. Дұрыс жауабы: ${exercise.analysis[selectedWordIdx].kazakhRoleName}` 
      });
    }
  };

  const roles = [
    { role: SentenceRole.SUBJECT, name: 'Бастауыш' },
    { role: SentenceRole.PREDICATE, name: 'Баяндауыш' },
    { role: SentenceRole.ATTRIBUTE, name: 'Анықтауыш' },
    { role: SentenceRole.OBJECT, name: 'Толықтауыш' },
    { role: SentenceRole.ADVERBIAL, name: 'Пысықтауыш' },
    { role: SentenceRole.PARTICLE, name: 'Шылау' },
  ];

  if (loading && !exercise) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Жаттығу дайындалуда...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-montserrat">Тренажер</h2>
          <p className="text-gray-500 text-sm">Сөйлем мүшелерін табу арқылы біліміңді сына</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-2xl font-bold border border-blue-100">
            Ұпай: {score}
          </div>
          <button 
            onClick={fetchNewExercise}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
            title="Жаңа сөйлем"
          >
            🔄 Жаңарту
          </button>
        </div>
      </header>

      {exercise && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Сөйлем:</h3>
            <div className="flex flex-wrap gap-3">
              {exercise.analysis.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!feedback) {
                      setSelectedWordIdx(idx);
                      setFeedback(null);
                    }
                  }}
                  className={`text-2xl sm:text-3xl px-3 py-1 rounded-xl transition-all ${
                    selectedWordIdx === idx 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'hover:bg-gray-100 text-gray-800'
                  } ${feedback && exercise.analysis[idx].role !== SentenceRole.PARTICLE ? 'cursor-default' : ''}`}
                >
                  {item.word}
                </button>
              ))}
            </div>
          </div>

          {selectedWordIdx !== null && !feedback && (
            <div className="space-y-6 animate-in slide-in-from-top duration-300">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Бұл қандай сөйлем мүшесі?</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => setSelectedRole(r.role)}
                    className={`p-4 rounded-2xl border-2 font-bold transition-all ${
                      selectedRole === r.role
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-100 hover:border-gray-200 text-gray-600'
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
              <button
                onClick={handleCheck}
                disabled={!selectedRole}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 transition-all text-lg"
              >
                Тексеру
              </button>
            </div>
          )}

          {feedback && (
            <div className={`p-6 rounded-2xl border-2 animate-in slide-in-from-bottom duration-300 ${
              feedback.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`}>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl">{feedback.isCorrect ? '✅' : '❌'}</span>
                <h4 className={`text-xl font-bold ${feedback.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {feedback.message}
                </h4>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="text-gray-700 font-medium">Түсініктеме:</p>
                <p className="text-gray-600">{exercise.analysis[selectedWordIdx!].explanation}</p>
              </div>
              <button
                onClick={fetchNewExercise}
                className="mt-6 w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all"
              >
                Келесі сөйлем
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Trainer;
