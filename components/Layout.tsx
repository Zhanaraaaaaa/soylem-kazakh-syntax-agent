
import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <span className="text-xl font-bold font-montserrat">Sө</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 font-montserrat hidden sm:block">
                Sөylem<span className="text-blue-600">Агент</span>
              </h1>
            </div>
            <nav className="flex space-x-1 sm:space-x-4">
              {[
                { id: 'analyze', label: 'Талдау', icon: '🔍' },
                { id: 'trainer', label: 'Тренажер', icon: '🎯' },
                { id: 'dashboard', label: 'Жетістік', icon: '📊' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id as ViewType)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeView === item.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-1 sm:mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Sөylem Агент - Қазақ тіліне арналған AI көмекші
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
