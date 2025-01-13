import { useState } from 'react';
import { Play, Trophy, Flag, Anchor, Sword, Plane } from 'lucide-react';
import { QuizType, QuizStats } from '../types';
import { HighScoresList } from './HighScoresList';
import { GlobalLeaderboard } from './GlobalLeaderboard';

interface StartScreenProps {
  onStart: (type: QuizType) => void;
  navyStats: QuizStats;
  armyStats: QuizStats;
  airStats: QuizStats;
  onResetScores: (type: QuizType) => void;
  resetCounter: number; // Add reset counter prop
}

export function StartScreen({ 
  onStart, 
  navyStats, 
  armyStats, 
  airStats, 
  onResetScores,
  resetCounter // Add reset counter to props
}: StartScreenProps) {
  const [showGlobalLeaderboard, setShowGlobalLeaderboard] = useState(false);

  return (
    <div className="max-w-6xl w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
          <Flag className="text-red-600" size={32} />
          Canadian Armed Forces Ranks
        </h1>
        <h2 className="text-xl text-gray-600">
          Test your knowledge of military ranks
        </h2>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-700 text-center mb-6">
        Choose Your Service Branch
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Navy Quiz Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/services/navy-emblem.svg" 
              alt="Royal Canadian Navy Emblem"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-blue-600 mb-4 text-center flex items-center justify-center gap-2">
            Royal Canadian Navy Ranks
          </h3>
          <div className="mb-6">
            <p className="text-gray-600 mb-4 text-center">
              Test your knowledge of Royal Canadian Navy ranks and insignias.
            </p>
            <HighScoresList 
              scores={navyStats.highScores} 
              accentColor="blue"
              onReset={() => onResetScores('navy')}
              title="Local Top Scores"
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
          <h3 className="text-xl font-bold text-green-600 mb-4 text-center flex items-center justify-center gap-2">
            Canadian Army Ranks
          </h3>
          <div className="mb-6">
            <p className="text-gray-600 mb-4 text-center">
              Test your knowledge of Canadian Army ranks and insignias.
            </p>
            <HighScoresList 
              scores={armyStats.highScores}
              accentColor="green"
              onReset={() => onResetScores('army')}
              title="Local Top Scores"
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
          <h3 className="text-xl font-bold text-sky-600 mb-4 text-center flex items-center justify-center gap-2">
            Royal Canadian Air Force Ranks
          </h3>
          <div className="mb-6">
            <p className="text-gray-600 mb-4 text-center">
              Test your knowledge of Royal Canadian Air Force ranks and insignias.
            </p>
            <HighScoresList 
              scores={airStats.highScores} 
              accentColor="sky"
              onReset={() => onResetScores('air')}
              title="Local Top Scores"
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

      {/* Global Leaderboard Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowGlobalLeaderboard(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
        >
          <Trophy size={20} />
          View Global Leaderboard
        </button>
      </div>

      {/* Global Leaderboard Modal */}
      {showGlobalLeaderboard && (
        <GlobalLeaderboard onClose={() => setShowGlobalLeaderboard(false)} />
      )}
    </div>
  );
}
