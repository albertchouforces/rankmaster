import { useState } from 'react';
import { Trophy, Flag, Play } from 'lucide-react';
import { QuizType, QuizStats } from '../types';
import { HighScoresList } from './HighScoresList';
import { GlobalLeaderboard } from './GlobalLeaderboard';

interface StartScreenProps {
  onStart: (type: QuizType) => void;
  navyStats: QuizStats;
  armyStats: QuizStats;
  airStats: QuizStats;
  combinedStats: QuizStats;
  onResetScores: (type: QuizType) => void;
}

export function StartScreen({ 
  onStart, 
  navyStats, 
  armyStats, 
  airStats,
  combinedStats,
  onResetScores
}: StartScreenProps) {
  const [showGlobalLeaderboard, setShowGlobalLeaderboard] = useState(false);
  const [navyResetCount, setNavyResetCount] = useState(0);
  const [armyResetCount, setArmyResetCount] = useState(0);
  const [airResetCount, setAirResetCount] = useState(0);
  const [combinedResetCount, setCombinedResetCount] = useState(0);

  const handleReset = (type: QuizType) => {
    onResetScores(type);
    switch (type) {
      case 'navy':
        setNavyResetCount(prev => prev + 1);
        break;
      case 'army':
        setArmyResetCount(prev => prev + 1);
        break;
      case 'air':
        setAirResetCount(prev => prev + 1);
        break;
      case 'combined':
        setCombinedResetCount(prev => prev + 1);
        break;
    }
  };

  return (
    <div className="max-w-7xl w-full">
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

      {/* Service-specific Quiz Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Navy Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/services/navy-emblem.svg" 
              alt="Royal Canadian Navy Emblem"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-blue-600 mb-4 text-center">
            Royal Canadian Navy Ranks
          </h3>
          <div className="mb-6 flex-grow">
            <p className="text-gray-600 mb-4 text-center">
              Test your knowledge of Royal Canadian Navy ranks and insignias.
            </p>
            <HighScoresList 
              key={`navy-scores-${navyResetCount}`}
              scores={navyStats.highScores} 
              onReset={() => handleReset('navy')}
              title="Local Top Scores"
              headerBackground={false}
              quizType="navy"
            />
          </div>
          <div className="flex justify-center mt-auto">
            <button
              onClick={() => onStart('navy')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Play size={20} />
              Start Navy Quiz
            </button>
          </div>
        </div>

        {/* Army Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/services/army-emblem.svg" 
              alt="Canadian Army Emblem"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-green-600 mb-4 text-center">
            Canadian Army Ranks
          </h3>
          <div className="mb-6 flex-grow">
            <p className="text-gray-600 mb-4 text-center">
              Test your knowledge of Canadian Army ranks and insignias.
            </p>
            <HighScoresList 
              key={`army-scores-${armyResetCount}`}
              scores={armyStats.highScores}
              onReset={() => handleReset('army')}
              title="Local Top Scores"
              headerBackground={true}
              quizType="army"
            />
          </div>
          <div className="flex justify-center mt-auto">
            <button
              onClick={() => onStart('army')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              <Play size={20} />
              Start Army Quiz
            </button>
          </div>
        </div>

        {/* Air Force Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/services/air-emblem.svg" 
              alt="Royal Canadian Air Force Emblem"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-sky-600 mb-4 text-center">
            Royal Canadian Air Force Ranks
          </h3>
          <div className="mb-6 flex-grow">
            <p className="text-gray-600 mb-4 text-center">
              Test your knowledge of Royal Canadian Air Force ranks and insignias.
            </p>
            <HighScoresList 
              key={`air-scores-${airResetCount}`}
              scores={airStats.highScores} 
              onReset={() => handleReset('air')}
              title="Local Top Scores"
              headerBackground={true}
              quizType="air"
            />
          </div>
          <div className="flex justify-center mt-auto">
            <button
              onClick={() => onStart('air')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-semibold"
            >
              <Play size={20} />
              Start Air Force Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Global Leaderboard Button - Now with more vertical spacing */}
      <div className="flex justify-center my-12">
        <button
          onClick={() => setShowGlobalLeaderboard(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
        >
          <Trophy size={20} />
          View Global Leaderboard
        </button>
      </div>

      {/* Divider with text */}
      <div className="relative mb-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-100 px-4 text-lg font-semibold text-gray-600">
            Advanced Challenge
          </span>
        </div>
      </div>

      {/* Combined Forces Card - Centered */}
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/services/caf-emblem.svg" 
              alt="Canadian Armed Forces Emblem"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-red-600 mb-4 text-center">
            Combined Canadian Armed Forces Ranks
          </h3>
          <div className="mb-6">
            <p className="text-gray-600 mb-4 text-center">
              Ready for the ultimate challenge? Test your knowledge of all three service branches combined.
            </p>
            <HighScoresList 
              key={`combined-scores-${combinedResetCount}`}
              scores={combinedStats.highScores} 
              onReset={() => handleReset('combined')}
              title="Local Top Scores"
              headerBackground={true}
              quizType="combined"
            />
          </div>
          <div className="flex justify-center mt-auto">
            <button
              onClick={() => onStart('combined')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              <Play size={20} />
              Start Combined Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Global Leaderboard Modal */}
      {showGlobalLeaderboard && (
        <GlobalLeaderboard onClose={() => setShowGlobalLeaderboard(false)} />
      )}
    </div>
  );
}
