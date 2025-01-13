import { useState, useEffect } from 'react';
import { HighScoreEntry } from '../types';
import { Trophy, Loader2, Medal as MedalIcon } from 'lucide-react';
import { saveGlobalScore, getGlobalScores } from '../lib/supabase';
import { Medal } from './Medal';

interface UserNameInputProps {
  onSubmit: (userName: string) => void;
  currentScore: number;
  currentTime: number;
  highScores: HighScoreEntry[];
  quizType: 'navy' | 'army' | 'air';
}

export function UserNameInput({ onSubmit, currentScore, currentTime, highScores, quizType }: UserNameInputProps) {
  const [userName, setUserName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [globalRank, setGlobalRank] = useState<number | null>(null);
  const [isLoadingGlobalRank, setIsLoadingGlobalRank] = useState(true);

  useEffect(() => {
    const checkGlobalRank = async () => {
      setIsLoadingGlobalRank(true);
      try {
        const globalScores = await getGlobalScores(quizType);
        const position = globalScores.findIndex(score => {
          if (currentScore > score.score) return true;
          if (currentScore === score.score && currentTime < score.time) return true;
          return false;
        });
        
        setGlobalRank(position === -1 ? globalScores.length + 1 : position + 1);
      } catch (err) {
        console.error('Error checking global rank:', err);
      } finally {
        setIsLoadingGlobalRank(false);
      }
    };

    checkGlobalRank();
  }, [currentScore, currentTime, quizType]);

  const calculateLocalRankPosition = (): number | null => {
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

  const localRankPosition = calculateLocalRankPosition();
  const isTopFiveLocal = localRankPosition !== null && localRankPosition <= 5;
  const isTopHundredGlobal = globalRank !== null && globalRank <= 100;

  const getPositionText = (position: number): string => {
    if (position === 1) return '1st';
    if (position === 2) return '2nd';
    if (position === 3) return '3rd';
    return `${position}th`;
  };

  const getLocalPositionDisplay = (position: number) => {
    // Only return Medal component for top 3 positions
    if (position <= 3) {
      return (
        <Medal 
          position={position} 
          color={position === 1 ? 'gold' : position === 2 ? 'silver' : 'bronze'} 
        />
      );
    }
    // For 4th and 5th, return a simple text number without a medal
    /*return (
      <div className="w-7 h-7 flex items-center justify-center text-gray-600">
        {position}
      </div>
    );*/
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const accuracy = Math.round((currentScore / 19) * 100); // 19 is total ranks per service
      const success = await saveGlobalScore({
        user_name: userName.trim(),
        score: currentScore,
        accuracy,
        time: currentTime,
        service: quizType,
        date: new Date().toISOString()
      });

      if (!success) {
        throw new Error('Failed to save global score');
      }

      onSubmit(userName.trim());
    } catch (err) {
      setError('Failed to save score. Please try again.');
      console.error('Error saving score:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const getServiceColor = () => {
    switch (quizType) {
      case 'navy': return 'blue';
      case 'army': return 'green';
      case 'air': return 'sky';
    }
  };

  const accentColor = getServiceColor();

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Enter Your Name</h3>
      
      {(isTopFiveLocal || isTopHundredGlobal) && !isLoadingGlobalRank && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-700 mb-3">
            <Trophy size={20} className="text-yellow-600" />
            <span className="font-semibold">Congratulations!</span>
          </div>
          
          <div className="space-y-2">
            {isTopFiveLocal && (
              <div className="flex items-center gap-2 text-yellow-800">
                {getLocalPositionDisplay(localRankPosition)}
                <span>
                  You've achieved {getPositionText(localRankPosition)} place locally!
                </span>
              </div>
            )}
            
            {isTopHundredGlobal && (
              <div className="flex items-center gap-2 text-yellow-800">
                <MedalIcon size={16} className="text-yellow-600" />
                <span>
                  You've ranked {getPositionText(globalRank)} globally!
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
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
          disabled={submitting}
        />
        <button
          type="submit"
          className={`px-6 py-2 bg-${accentColor}-600 text-white rounded-lg hover:bg-${accentColor}-700 transition-colors flex items-center justify-center gap-2`}
          disabled={!userName.trim() || submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Submitting...
            </>
          ) : (
            'Submit Score'
          )}
        </button>
      </form>
    </div>
  );
}
