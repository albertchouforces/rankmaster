import { useState } from 'react';
import { HighScoreEntry } from '../types';
import { Trophy } from 'lucide-react';

interface UserNameInputProps {
  onSubmit: (userName: string) => void;
  currentScore: number;
  currentTime: number;
  highScores: HighScoreEntry[];
}

export function UserNameInput({ onSubmit, currentScore, currentTime, highScores }: UserNameInputProps) {
  const [userName, setUserName] = useState('');

  const calculateRankPosition = (): number | null => {
    const position = highScores.findIndex(score => {
      if (currentScore > score.score) return true;
      if (currentScore === score.score && currentTime < score.time) return true;
      return false;
    });
    
    if (position === -1 && highScores.length < 5) {
      return highScores.length + 1;
    }
    
    return position === -1 ? null : position + 1;
  };

  const rankPosition = calculateRankPosition();
  const isTopFive = rankPosition !== null && rankPosition <= 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      onSubmit(userName.trim());
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Enter Your Name</h3>
      
      {isTopFive && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-700 mb-2">
            <Trophy size={20} className="text-yellow-600" />
            <span className="font-semibold">Congratulations!</span>
          </div>
          <p className="text-yellow-800">
            You've achieved position #{rankPosition} on the leaderboard!
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={30}
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={!userName.trim()}
        >
          Submit Score
        </button>
      </form>
    </div>
  );
}
