import { Medal, Trash2 } from 'lucide-react';
import { HighScoreEntry } from '../types';

interface HighScoresListProps {
  scores: HighScoreEntry[];
  accentColor: string;
  onReset: () => void;
}

export function HighScoresList({ scores, accentColor, onReset }: HighScoresListProps) {
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <Medal size={20} className={`text-${accentColor}-600`} />
          Top Scores
        </h4>
        <button
          onClick={onReset}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium text-${accentColor}-600 hover:bg-${accentColor}-50 transition-colors`}
          title="Reset High Scores"
        >
          <Trash2 size={16} />
          Reset Scores
        </button>
      </div>
      {scores.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full min-w-[300px]">
            <thead>
              <tr className={`bg-${accentColor}-50`}>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600 whitespace-nowrap"></th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Score</th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Time</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="px-3 py-2 text-sm text-gray-600 whitespace-nowrap">{index + 1}</td>
                  <td className="px-3 py-2 text-sm font-medium text-gray-800">{score.userName}</td>
                  <td className="px-3 py-2 text-sm text-gray-600 whitespace-nowrap">
                    {score.score} ({score.accuracy}%)
                  </td>
                  <td className="px-3 py-2 text-sm font-mono text-gray-600 whitespace-nowrap">
                    {formatTime(score.time)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-sm italic">No scores recorded yet</p>
      )}
    </div>
  );
}
