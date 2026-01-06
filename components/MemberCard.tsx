
import React from 'react';
import { WordAnalysis, SentenceRole } from '../types';

interface MemberCardProps {
  analysis: WordAnalysis;
}

const MemberCard: React.FC<MemberCardProps> = ({ analysis }) => {
  const getStyles = (role: SentenceRole) => {
    switch (role) {
      case SentenceRole.SUBJECT:
        return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', underline: 'role-subject' };
      case SentenceRole.PREDICATE:
        return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', underline: 'role-predicate' };
      case SentenceRole.ATTRIBUTE:
        return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', underline: 'role-attribute' };
      case SentenceRole.OBJECT:
        return { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', underline: 'role-object' };
      case SentenceRole.ADVERBIAL:
        return { color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', underline: 'role-adverbial' };
      case SentenceRole.PARTICLE:
        return { color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200', underline: '' };
      default:
        return { color: 'text-gray-400', bg: 'bg-white', border: 'border-gray-100', underline: '' };
    }
  };

  const styles = getStyles(analysis.role);

  return (
    <div className={`p-4 rounded-xl border ${styles.border} ${styles.bg} transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-lg font-bold font-montserrat ${styles.color} ${styles.underline}`}>
          {analysis.word}
        </span>
        <span className="text-xs font-semibold px-2 py-1 bg-white rounded-full border border-gray-100 shadow-sm">
          {analysis.kazakhRoleName}
        </span>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Сұрағы:</p>
        <p className="text-sm font-semibold text-gray-800">{analysis.question || '—'}</p>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-2">Түсініктеме:</p>
        <p className="text-sm text-gray-700 leading-relaxed">{analysis.explanation}</p>
      </div>
    </div>
  );
};

export default MemberCard;
