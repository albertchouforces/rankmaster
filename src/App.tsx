import { useState, useEffect, useMemo } from 'react';
import { FlashCard } from './components/FlashCard';
import { ScoreDisplay } from './components/ScoreDisplay';
import { StartScreen } from './components/StartScreen';
import { UserNameInput } from './components/UserNameInput';
import { Footer } from './components/Footer';
import { navyRanks } from './data/navyRanks';
import { armyRanks } from './data/armyRanks';
import { airForceRanks } from './data/airForceRanks';
import { Anchor, Sword, Plane } from 'lucide-react';
import type { QuizType, QuizStats, RankData, HighScoreEntry } from './types';

type GameState = 'start' | 'playing' | 'entering-name';

const INITIAL_QUIZ_STATS: QuizStats = {
  highScore: 0,
  bestRun: null,
  highScores: []
};

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [quizType, setQuizType] = useState<QuizType>('navy');
  const [currentRankIndex, setCurrentRankIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [randomizedRanks, setRandomizedRanks] = useState<RankData[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [lastPauseTime, setLastPauseTime] = useState<number | null>(null);
  const [accumulatedTime, setAccumulatedTime] = useState(0);

  // Load initial stats from localStorage
  useEffect(() => {
    const initializeStats = () => {
      const quizTypes: QuizType[] = ['navy', 'army', 'air'];
      quizTypes.forEach((type) => {
        const statsKey = `${type}Stats`;
        const storedStats = localStorage.getItem(statsKey);
        if (!storedStats) {
          localStorage.setItem(statsKey, JSON.stringify(INITIAL_QUIZ_STATS));
        }
      });
    };

    initializeStats();
  }, []);

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

  // Timer effect with pause functionality
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (gameState === 'playing' && startTime && !isPaused) {
      intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime - accumulatedTime;
        setCurrentTime(elapsed);
      }, 10);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [gameState, startTime, isPaused, accumulatedTime]);

  const getCurrentStats = (type: QuizType): QuizStats => {
    const statsKey = `${type}Stats`;
    const storedStats = localStorage.getItem(statsKey);
    if (storedStats) {
      return JSON.parse(storedStats);
    }
    return INITIAL_QUIZ_STATS;
  };

  const pauseTimer = () => {
    if (!isPaused) {
      setIsPaused(true);
      setLastPauseTime(Date.now());
    }
  };

  const resumeTimer = () => {
    if (isPaused && lastPauseTime) {
      const pauseDuration = Date.now() - lastPauseTime;
      setAccumulatedTime(prev => prev + pauseDuration);
      setIsPaused(false);
      setLastPauseTime(null);
    }
  };

  const updateStats = (userName: string) => {
    const statsKey = `${quizType}Stats`;
    const currentStats = getCurrentStats(quizType);
    const accuracy = Math.round((correctAnswers / totalAnswers) * 100);

    const newHighScore = Math.max(currentStats.highScore, correctAnswers);

    const shouldUpdateBestRun = !currentStats.bestRun || 
      (correctAnswers >= currentStats.bestRun.score && currentTime < currentStats.bestRun.time);

    const newBestRun = shouldUpdateBestRun ? {
      userName,
      time: currentTime,
      score: correctAnswers,
      accuracy
    } : currentStats.bestRun;

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
    setIsPaused(false);
    setLastPauseTime(null);
    setAccumulatedTime(0);
    
    // Get the correct ranks for the selected quiz type
    const ranks = type === 'navy' ? navyRanks :
                 type === 'army' ? armyRanks :
                 airForceRanks;
    
    // Randomize the ranks order when starting a new quiz
    setRandomizedRanks(shuffleArray(ranks));
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) setCorrectAnswers(prev => prev + 1);
    setTotalAnswers(prev => prev + 1);
    pauseTimer();
  };

  const handleNext = () => {
    resumeTimer();
    if (currentRankIndex < randomizedRanks.length - 1) {
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
    return randomizedRanks[currentRankIndex];
  };

  // Generate random options for the current question
  const getRandomOptions = useMemo(() => {
    if (!randomizedRanks.length) return [];
    
    const correctRank = randomizedRanks[currentRankIndex]?.rank;
    if (!correctRank) return [];
    
    const otherRanks = randomizedRanks
      .filter(r => r.rank !== correctRank)
      .map(r => r.rank);
    
    // Get 3 random incorrect answers
    const randomIncorrect = shuffleArray(otherRanks).slice(0, 3);
    
    // Combine with correct answer and shuffle again
    return shuffleArray([...randomIncorrect, correctRank]);
  }, [currentRankIndex, randomizedRanks]);

  const handleResetScores = (type: QuizType) => {
    localStorage.setItem(`${type}Stats`, JSON.stringify(INITIAL_QUIZ_STATS));
    setGameState(prev => prev);
  };

  const quizTitle = getQuizTitle();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 py-8 px-4">
        <div className="container mx-auto flex flex-col items-center gap-8">
          {gameState === 'start' ? (
            <StartScreen 
              onStart={handleStart} 
              navyStats={getCurrentStats('navy')}
              armyStats={getCurrentStats('army')}
              airStats={getCurrentStats('air')}
              onResetScores={handleResetScores}
            />
          ) : (
            <>
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
                    totalQuestions={randomizedRanks.length}
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
                    totalQuestions={randomizedRanks.length}
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
                    totalQuestions={randomizedRanks.length}
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
      <Footer />
    </div>
  );
}

export default App;
