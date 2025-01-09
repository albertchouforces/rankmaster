import { Play, Trophy, Clock } from 'lucide-react';
import { QuizType, QuizStats } from '../types';
import { HighScoresList } from './HighScoresList';

interface StartScreenProps {
  onStart: (type: QuizType) => void;
  navyStats: QuizStats;
  armyStats: QuizStats;
  airStats: QuizStats;
  onResetScores: (type: QuizType) => void;
}

export function StartScreen({ onStart, navyStats, armyStats, airStats, onResetScores }: StartScreenProps) {
  return (
    <div className="max-w-6xl w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Choose Your Service Branch
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Navy Quiz Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/services/navy-emblem.svg" 
              alt="Royal Canadian Navy Emblem"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Royal Canadian Navy Ranks
          </h3>
          <div className="mb-6">
            <p className="text-gray-600 mb-4 text-center">
              Test your knowledge of Royal Canadian Navy ranks and insignias.
            </p>
            <HighScoresList 
              scores={navyStats.highScores.slice(0, 5)} 
              accentColor="blue"
              onReset={() => onResetScores('navy')}
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => onStart('navy')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Play size={20} />
              Start Navy Quiz
            </button>
          </div>
        </div>

        {/* Army Quiz Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/services/army-emblem.svg" 
              alt="Canadian Army Emblem"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Canadian Army Ranks
          </h3>
          <div className="mb-6">
            <p className="text-gray-600 mb-4 text-center">
              Test your knowledge of Canadian Army ranks and insignias.
            </p>
            <HighScoresList 
              scores={armyStats.highScores.slice(0, 5)} 
              accentColor="green"
              onReset={() => onResetScores('army')}
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => onStart('army')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              <Play size={20} />
              Start Army Quiz
            </button>
          </div>
        </div>

        {/* Air Force Quiz Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/services/air-emblem.svg" 
              alt="Royal Canadian Air Force Emblem"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Royal Canadian Air Force Ranks
          </h3>
          <div className="mb-6">
            <p className="text-gray-600 mb-4 text-center">
              Test your knowledge of Royal Canadian Air Force ranks and insignias.
            </p>
            <HighScoresList 
              scores={airStats.highScores.slice(0, 5)} 
              accentColor="sky"
              onReset={() => onResetScores('air')}
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => onStart('air')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-semibold"
            >
              <Play size={20} />
              Start Air Force Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
