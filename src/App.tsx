import { useState, useEffect, useMemo } from 'react';
import { FlashCard } from './components/FlashCard';
import { ScoreDisplay } from './components/ScoreDisplay';
import { StartScreen } from './components/StartScreen';
import { UserNameInput } from './components/UserNameInput';
import { navyRanks } from './data/navyRanks';
import { armyRanks } from './data/armyRanks';
import { airForceRanks } from './data/airForceRanks';
import { Anchor, Sword, Plane } from 'lucide-react';
import type { QuizType, QuizStats, RankData, HighScoreEntry } from './types';

type GameState = 'start' | 'playing' | 'entering-name';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [quizType, setQuizType] = useState<QuizType>('navy');
  const [currentRankIndex, setCurrentRankIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  // Add a state to force re-renders when scores are reset
  const [resetCounter, setResetCounter] = useState(0);

  const getQuizTitle = () => {
    switch (quizType) {
      case 'navy':
        return {
          text: "Royal Canadian Navy Ranks",
          icon: <Anchor className="text-blue-600" size={32} />,
          color: "text-blue-600"
        };
      case 'army':
        return {
          text: "Canadian Army Ranks",
          icon: <Sword className="text-green-600" size={32} />,
          color: "text-green-600"
        };
      case 'air':
        return {
          text: "Royal Canadian Air Force Ranks",
          icon: <Plane className="text-sky-600" size={32} />,
          color: "text-sky-600"
        };
    }
  };

  // Timer effect
  useEffect(() => {
    let intervalId: number;

    if (gameState === 'playing' && startTime) {
      intervalId = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 10);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [gameState, startTime]);

  const getCurrentRanks = (): RankData[] => {
    switch (quizType) {
      case 'navy':
        return navyRanks;
      case 'army':
        return armyRanks;
      case 'air':
        return airForceRanks;
    }
  };

  const getCurrentStats = (type: QuizType): QuizStats => {
    const statsKey = `${type}Stats`;
    const storedStats = localStorage.getItem(statsKey);
    if (storedStats) {
      return JSON.parse(storedStats);
    }
    return {
      highScore: 0,
      bestRun: null,
      highScores: []
    };
  };

  const updateStats = (userName: string) => {
    const statsKey = `${quizType}Stats`;
    const currentStats = getCurrentStats(quizType);
    const accuracy = Math.round((correctAnswers / totalAnswers) * 100);

    // Update high score if necessary
    const newHighScore = Math.max(currentStats.highScore, correctAnswers);

    // Update best run if necessary
    const shouldUpdateBestRun = !currentStats.bestRun || 
      (correctAnswers >= currentStats.bestRun.score && currentTime < currentStats.bestRun.time);

    const newBestRun = shouldUpdateBestRun ? {
      userName,
      time: currentTime,
      score: correctAnswers,
      accuracy
    } : currentStats.bestRun;

    // Update high scores list
    const newScore: HighScoreEntry = {
      userName,
      score: correctAnswers,
      accuracy,
      time: currentTime,
      date: new Date().toISOString()
    };

    let newHighScores = [...currentStats.highScores, newScore]
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.time - b.time;
      })
      .slice(0, 5);

    const newStats = {
      highScore: newHighScore,
      bestRun: newBestRun,
      highScores: newHighScores
    };

    localStorage.setItem(statsKey, JSON.stringify(newStats));
  };

  const handleStart = (type: QuizType) => {
    setQuizType(type);
    setGameState('playing');
    setCurrentRankIndex(0);
    setCorrectAnswers(0);
    setTotalAnswers(0);
    setCurrentTime(0);
    setStartTime(Date.now());
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) setCorrectAnswers(prev => prev + 1);
    setTotalAnswers(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentRankIndex < getCurrentRanks().length - 1) {
      setCurrentRankIndex(prev => prev + 1);
    } else {
      setGameState('entering-name');
    }
  };

  const handleRestart = () => {
    setGameState('start');
  };

  const handleUserNameSubmit = (userName: string) => {
    updateStats(userName);
    setGameState('start');
  };

  const getCurrentRank = () => {
    const ranks = getCurrentRanks();
    return ranks[currentRankIndex];
  };

  // Memoize the random options to prevent re-renders from causing them to shuffle
  const getRandomOptions = useMemo(() => {
    const ranks = getCurrentRanks();
    const correctRank = ranks[currentRankIndex].rank;
    const otherRanks = ranks
      .filter(r => r.rank !== correctRank)
      .map(r => r.rank)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    return [...otherRanks, correctRank].sort(() => Math.random() - 0.5);
  }, [currentRankIndex, quizType]);

  const handleResetScores = (type: QuizType) => {
    const statsKey = `${type}Stats`;
    // Set empty stats object instead of just removing the item
    const emptyStats = {
      highScore: 0,
      bestRun: null,
      highScores: []
    };
    localStorage.setItem(statsKey, JSON.stringify(emptyStats));
    // Increment reset counter to force re-render
    setResetCounter(prev => prev + 1);
  };

  const quizTitle = getQuizTitle();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto flex flex-col items-center gap-8">
        {gameState === 'start' ? (
          <StartScreen 
            onStart={handleStart} 
            navyStats={getCurrentStats('navy')}
            armyStats={getCurrentStats('army')}
            airStats={getCurrentStats('air')}
            onResetScores={handleResetScores}
            resetCounter={resetCounter} // Pass reset counter to force re-render
          />
        ) : (
          <>
            {/* Quiz Title */}
            <div className="flex items-center gap-3">
              {quizTitle.icon}
              <h1 className={`text-2xl font-bold ${quizTitle.color}`}>
                {quizTitle.text}
              </h1>
            </div>

            {gameState === 'playing' ? (
              <div className="flex flex-col items-center gap-6">
                <ScoreDisplay 
                  correct={correctAnswers} 
                  total={totalAnswers} 
                  highScore={getCurrentStats(quizType).highScore}
                  onRestart={handleRestart}
                  isFinished={false}
                  totalQuestions={getCurrentRanks().length}
                  currentTime={currentTime}
                  bestRun={getCurrentStats(quizType).bestRun}
                  quizType={quizType}
                />
                <FlashCard
                  rank={getCurrentRank()}
                  options={getRandomOptions}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                  questionNumber={currentRankIndex + 1}
                  totalQuestions={getCurrentRanks().length}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <ScoreDisplay 
                  correct={correctAnswers} 
                  total={totalAnswers} 
                  highScore={getCurrentStats(quizType).highScore}
                  onRestart={handleRestart}
                  isFinished={true}
                  totalQuestions={getCurrentRanks().length}
                  currentTime={currentTime}
                  bestRun={getCurrentStats(quizType).bestRun}
                  quizType={quizType}
                />
                <UserNameInput 
                  onSubmit={handleUserNameSubmit}
                  currentScore={correctAnswers}
                  currentTime={currentTime}
                  highScores={getCurrentStats(quizType).highScores}
                  quizType={quizType}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
