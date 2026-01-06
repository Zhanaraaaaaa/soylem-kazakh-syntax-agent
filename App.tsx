
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Analyzer from './components/Analyzer';
import Trainer from './components/Trainer';
import Dashboard from './components/Dashboard';
import { ViewType, UserProgress } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('analyze');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('soylem_progress');
    return saved ? JSON.parse(saved) : {
      totalAnalyzed: 0,
      trainerSessions: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      level: 1,
      experience: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('soylem_progress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (update: Partial<UserProgress>) => {
    setProgress(prev => {
      const nextExperience = prev.experience + (update.experience || 0);
      const nextLevel = Math.floor(nextExperience / 100) + 1;
      
      return {
        ...prev,
        totalAnalyzed: prev.totalAnalyzed + (update.totalAnalyzed || 0),
        trainerSessions: prev.trainerSessions + (update.trainerSessions || 0),
        correctAnswers: prev.correctAnswers + (update.correctAnswers || 0),
        totalQuestions: prev.totalQuestions + (update.totalQuestions || 0),
        experience: nextExperience,
        level: nextLevel
      };
    });
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {activeView === 'analyze' && <Analyzer onProgressUpdate={updateProgress} />}
      {activeView === 'trainer' && <Trainer onProgressUpdate={updateProgress} />}
      {activeView === 'dashboard' && <Dashboard progress={progress} />}
    </Layout>
  );
};

export default App;
