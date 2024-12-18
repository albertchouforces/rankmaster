import { Play, Trophy, Clock } from 'lucide-react';
import { QuizType, QuizStats } from '../types';

interface StartScreenProps {
  onStart: (type: QuizType) => void;
  navyStats: QuizStats;
  armyStats: QuizStats;
  airStats: QuizStats;
}

export function StartScreen({ onStart, navyStats, armyStats, airStats }: StartScreenProps) {
  return (
    <div className="max-w-6xl w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Choose Your Service Branch
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Navy Quiz Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/services/navy-emblem.svg" 
              alt="Royal Canadian Navy Emblem"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Royal Canadian Navy Ranks
          </h3>
          <div className="mb-6 text-gray-600">
            <p className="mb-4">
              Test your knowledge of Royal Canadian Navy ranks and insignias.
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-blue-600">
                <Trophy size={20} />
                <span className="font-semibold">
                  High Score: {navyStats.highScore}
                  {navyStats.bestRun && ` (${navyStats.bestRun.accuracy}%)`}
                </span>
              </div>
              {navyStats.bestRun && (
                <div className="flex items-center gap-2 text-blue-600">
                  <Clock size={20} />
                  <span className="font-semibold">
                    Best Time: {Math.floor(navyStats.bestRun.time / 60000)}:
                    {Math.floor((navyStats.bestRun.time % 60000) / 1000).toString().padStart(2, '0')}.
                    {Math.floor((navyStats.bestRun.time % 1000) / 10).toString().padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => onStart('navy')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Play size={20} />
            Start Navy Quiz
          </button>
        </div>

        {/* Army Quiz Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/services/army-emblem.svg" 
              alt="Canadian Army Emblem"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Canadian Army Ranks
          </h3>
          <div className="mb-6 text-gray-600">
            <p className="mb-4">
              Test your knowledge of Canadian Army ranks and insignias.
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-green-600">
                <Trophy size={20} />
                <span className="font-semibold">
                  High Score: {armyStats.highScore}
                  {armyStats.bestRun && ` (${armyStats.bestRun.accuracy}%)`}
                </span>
              </div>
              {armyStats.bestRun && (
                <div className="flex items-center gap-2 text-green-600">
                  <Clock size={20} />
                  <span className="font-semibold">
                    Best Time: {Math.floor(armyStats.bestRun.time / 60000)}:
                    {Math.floor((armyStats.bestRun.time % 60000) / 1000).toString().padStart(2, '0')}.
                    {Math.floor((armyStats.bestRun.time % 1000) / 10).toString().padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => onStart('army')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            <Play size={20} />
            Start Army Quiz
          </button>
        </div>

        {/* Air Force Quiz Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/services/air-emblem.svg" 
              alt="Royal Canadian Air Force Emblem"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Royal Canadian Air Force Ranks
          </h3>
          <div className="mb-6 text-gray-600">
            <p className="mb-4">
              Test your knowledge of Royal Canadian Air Force ranks and insignias.
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-sky-600">
                <Trophy size={20} />
                <span className="font-semibold">
                  High Score: {airStats.highScore}
                  {airStats.bestRun && ` (${airStats.bestRun.accuracy}%)`}
                </span>
              </div>
              {airStats.bestRun && (
                <div className="flex items-center gap-2 text-sky-600">
                  <Clock size={20} />
                  <span className="font-semibold">
                    Best Time: {Math.floor(airStats.bestRun.time / 60000)}:
                    {Math.floor((airStats.bestRun.time % 60000) / 1000).toString().padStart(2, '0')}.
                    {Math.floor((airStats.bestRun.time % 1000) / 10).toString().padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>
          </div>
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
  );
}
