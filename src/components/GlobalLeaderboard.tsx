import { useState, useEffect } from 'react';
import { getGlobalScores, type GlobalScoreEntry } from '../lib/supabase';
import { Medal } from './Medal';
import { Trophy, Loader2, X } from 'lucide-react';
import { QuizType } from '../types';

interface GlobalLeaderboardProps {
  onClose: () => void;
}

export function GlobalLeaderboard({ onClose }: GlobalLeaderboardProps) {
  const [selectedService, setSelectedService] = useState<QuizType>('navy');
  const [scores, setScores] = useState<GlobalScoreEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getGlobalScores(selectedService);
        setScores(data);
      } catch (err) {
        setError('Failed to load global scores. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [selectedService]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const getServiceColor = (service: QuizType) => {
    switch (service) {
      case 'navy': return 'blue';
      case 'army': return 'green';
      case 'air': return 'sky';
      case 'combined': return 'red';
    }
  };

  const getPositionDisplay = (index: number) => {
    switch (index) {
      case 0: return <Medal position={1} color="gold" />;
      case 1: return <Medal position={2} color="silver" />;
      case 2: return <Medal position={3} color="bronze" />;
      default: return <span className="w-7 h-7 flex items-center justify-center">{index + 1}</span>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Global Leaderboard</h2>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close leaderboard"
            >
              <X size={28} className="text-gray-600 hover:text-gray-800" />
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['navy', 'army', 'air', 'combined'] as const).map((service) => (
              <button
                key={service}
                onClick={() => setSelectedService(service)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedService === service
                    ? `bg-${getServiceColor(service)}-600 text-white`
                    : `text-${getServiceColor(service)}-600 hover:bg-${getServiceColor(service)}-50`
                }`}
              >
                {service === 'navy' ? 'Royal Canadian Navy' :
                 service === 'army' ? 'Canadian Army' :
                 service === 'air' ? 'Royal Canadian Air Force' :
                 'Combined CAF'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="animate-spin text-gray-500" size={32} />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 p-4">
              {error}
            </div>
          ) : scores.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Rank</th>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Score</th>
                  <th className="pb-2">Accuracy</th>
                  <th className="pb-2">Time</th>
                  <th className="pb-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="py-2">{getPositionDisplay(index)}</td>
                    <td className="py-2 font-medium">{score.user_name}</td>
                    <td className="py-2">{score.score}</td>
                    <td className="py-2">{score.accuracy}%</td>
                    <td className="py-2 font-mono">{formatTime(score.time)}</td>
                    <td className="py-2 text-gray-500">
                      {new Date(score.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-gray-500 p-4">
              No scores recorded yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
