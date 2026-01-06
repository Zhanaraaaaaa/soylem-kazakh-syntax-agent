
import React, { useState } from 'react';
import { analyzeSentence } from '../services/geminiService';
import { AnalysisResult, UserProgress } from '../types';
import MemberCard from './MemberCard';

interface AnalyzerProps {
  onProgressUpdate: (update: Partial<UserProgress>) => void;
}

const Analyzer: React.FC<AnalyzerProps> = ({ onProgressUpdate }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await analyzeSentence(input);
      setResult(res);
      onProgressUpdate({ totalAnalyzed: 1 });
    } catch (error) {
      console.error(error);
      alert('Талдау кезінде қате кетті. Қайталап көріңіз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 font-montserrat mb-4">Сөйлемді талдау</h2>
          <p className="text-gray-500">
            Кез келген сөйлемді жазыңыз, біз оны мүшелеріне бөліп, сұрақтарын тауып береміз.
          </p>
        </div>

        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Мысалы: Күз келді, күн суыта бастады."
            className="w-full h-32 p-4 text-lg border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none group-hover:border-gray-200"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !input.trim()}
            className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              '🚀 Талдау'
            )}
          </button>
        </div>
      </section>

      {result && (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-700">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Талдау нәтижесі</h3>
            <div className="text-2xl sm:text-3xl leading-relaxed text-gray-800 flex flex-wrap gap-y-6 gap-x-2">
              {result.analysis.map((item, idx) => {
                const underlineClass = 
                  item.role === 'Subject' ? 'role-subject' :
                  item.role === 'Predicate' ? 'role-predicate' :
                  item.role === 'Attribute' ? 'role-attribute' :
                  item.role === 'Object' ? 'role-object' :
                  item.role === 'Adverbial' ? 'role-adverbial' : '';
                
                return (
                  <span key={idx} className={`${underlineClass} transition-all hover:bg-blue-50 cursor-help px-1`}>
                    {item.word}
                  </span>
                );
              })}
            </div>
            <p className="mt-6 text-gray-600 italic border-l-4 border-blue-200 pl-4">
              {result.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.analysis.map((item, idx) => (
              <MemberCard key={idx} analysis={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyzer;
