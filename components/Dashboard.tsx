
import React from 'react';
import { UserProgress } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  progress: UserProgress;
}

const Dashboard: React.FC<DashboardProps> = ({ progress }) => {
  const accuracy = progress.totalQuestions > 0 
    ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100) 
    : 0;

  const data = [
    { name: 'Талдалды', value: progress.totalAnalyzed, color: '#3b82f6' },
    { name: 'Сұрақтар', value: progress.totalQuestions, color: '#8b5cf6' },
    { name: 'Дұрыс', value: progress.correctAnswers, color: '#10b981' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4">
            🎓
          </div>
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Деңгей</h3>
          <p className="text-4xl font-black text-gray-900 font-montserrat">{progress.level}</p>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-1000" 
              style={{ width: `${(progress.experience % 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Келесі деңгейге дейін: {100 - (progress.experience % 100)} XP</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4">
            🎯
          </div>
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Дәлдік</h3>
          <p className="text-4xl font-black text-gray-900 font-montserrat">{accuracy}%</p>
          <p className="text-xs text-gray-400 mt-2">{progress.correctAnswers} / {progress.totalQuestions} дұрыс жауап</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-4">
            ✨
          </div>
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Талдаулар</h3>
          <p className="text-4xl font-black text-gray-900 font-montserrat">{progress.totalAnalyzed}</p>
          <p className="text-xs text-gray-400 mt-2">Барлық талданған сөйлемдер</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 font-montserrat mb-8">Белсенділік статистикасы</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-blue-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-200">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-montserrat">Күнделікті мақсат</h3>
          <p className="text-blue-100">Күніне кем дегенде 5 сөйлем талдап, біліміңді шыңда!</p>
        </div>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-all shrink-0">
          Жаттығуды бастау
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
