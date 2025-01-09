import { useState, useEffect, useRef } from 'react';
import './index.css';
import { navyRanks } from './data/navyRanks';
import { armyRanks } from './data/armyRanks';
import { airForceRanks } from './data/airForceRanks';
import { FlashCard } from './components/FlashCard';
import { ScoreDisplay } from './components/ScoreDisplay';
import { StartScreen } from './components/StartScreen';
import { UserNameInput } from './components/UserNameInput';
import { Anchor, Sword, Plane, Flag } from 'lucide-react';
import { QuizType, RankData, BestRun, QuizStats, HighScoreEntry } from './types';

type GameState = 'start' | 'playing' | 'finished' | 'entering-name';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [quizType, setQuizType] = useState<QuizType>('navy');
  const [shuffledRanks, setShuffledRanks] = useState<RankData[]>([]);
  const [currentRankIndex, setCurrentRankIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);

  // Separate stats for each service
  const [navyStats, setNavyStats] = useState<QuizStats>(() => ({
    highScore: parseInt(localStorage.getItem('navyRanksHighScore') || '0'),
    bestRun: localStorage.getItem('navyRanksBestRun') 
      ? JSON.parse(localStorage.getItem('navyRanksBestRun')!) 
      : null,
    highScores: localStorage.getItem('navyRanksHighScores')
      ? JSON.parse(localStorage.getItem('navyRanksHighScores')!)
      : []
  }));

  const [armyStats, setArmyStats] = useState<QuizStats>(() => ({
    highScore: parseInt(localStorage.getItem('armyRanksHighScore') || '0'),
    bestRun: localStorage.getItem('armyRanksBestRun')
      ? JSON.parse(localStorage.getItem('armyRanksBestRun')!)
      : null,
    highScores: localStorage.getItem('armyRanksHighScores')
      ? JSON.parse(localStorage.getItem('armyRanksHighScores')!)
      : []
  }));

  const [airStats, setAirStats] = useState<QuizStats>(() => ({
    highScore: parseInt(localStorage.getItem('airRanksHighScore') || '0'),
    bestRun: localStorage.getItem('airRanksBestRun')
      ? JSON.parse(localStorage.getItem('airRanksBestRun')!)
      : null,
    highScores: localStorage.getItem('airRanksHighScores')
      ? JSON.parse(localStorage.getItem('airRanksHighScores')!)
      : []
  }));
  
  // Timer states
  const [currentTime, setCurrentTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  const getCurrentRanks = () => {
    switch (quizType) {
      case 'navy': return navyRanks;
      case 'army': return armyRanks;
      case 'air': return airForceRanks;
    }
  };

  const getCurrentStats = () => {
    switch (quizType) {
      case 'navy': return navyStats;
      case 'army': return armyStats;
      case 'air': return airStats;
    }
  };

  const updateCurrentStats = (stats: QuizStats) => {
    switch (quizType) {
      case 'navy': setNavyStats(stats); break;
      case 'army': setArmyStats(stats); break;
      case 'air': setAirStats(stats); break;
    }
  };

  const handleResetScores = (type: QuizType) => {
    const emptyStats: QuizStats = {
      highScore: 0,
      bestRun: null,
      highScores: []
    };

    const storagePrefix = type === 'navy' ? 'navy' : 
                         type === 'army' ? 'army' : 'air';

    // Clear localStorage
    localStorage.removeItem(`${storagePrefix}RanksHighScore`);
    localStorage.removeItem(`${storagePrefix}RanksBestRun`);
    localStorage.removeItem(`${storagePrefix}RanksHighScores`);

    // Update state
    switch (type) {
      case 'navy':
        setNavyStats(emptyStats);
        break;
      case 'army':
        setArmyStats(emptyStats);
        break;
      case 'air':
        setAirStats(emptyStats);
        break;
    }
  };

  const generateNewOptions = (currentRank: RankData) => {
    const ranks = getCurrentRanks();
    const otherRanks = ranks
      .filter((r) => r.rank !== currentRank.rank)
      .map((r) => r.rank);
    
    // Get 3 random wrong answers
    const wrongOptions = otherRanks
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    // Combine correct answer with wrong options and shuffle
    return [...wrongOptions, currentRank.rank]
      .sort(() => Math.random() - 0.5);
  };

  // Timer logic
  useEffect(() => {
    if (isTimerRunning) {
      lastTickRef.current = Date.now();
      timerRef.current = window.setInterval(() => {
        const now = Date.now();
        if (lastTickRef.current) {
          const delta = now - lastTickRef.current;
          setCurrentTime(time => time + delta);
        }
        lastTickRef.current = now;
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      lastTickRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  // Set initial options
  useEffect(() => {
    if (shuffledRanks.length > 0) {
      setCurrentOptions(generateNewOptions(shuffledRanks[currentRankIndex]));
    }
  }, [currentRankIndex, shuffledRanks]);

  const handleAnswer = (correct: boolean) => {
    setIsTimerRunning(false);
    if (correct) setCorrectAnswers((prev) => prev + 1);
    setTotalAnswers((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentRankIndex === shuffledRanks.length - 1) {
      setGameState('entering-name');
    } else {
      setCurrentRankIndex((prev) => prev + 1);
      setIsTimerRunning(true);
    }
  };

  const handleUserNameSubmit = (userName: string) => {
    const accuracy = Math.round((correctAnswers / getCurrentRanks().length) * 100);
    
    const newScore: HighScoreEntry = {
      userName,
      score: correctAnswers,
      accuracy,
      time: currentTime,
      date: new Date().toISOString()
    };

    const currentStats = getCurrentStats();
    const newHighScores = [...currentStats.highScores, newScore]
      .sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return a.time - b.time;
      })
      .slice(0, 100); // Keep top 100 scores

    // Update best run if applicable
    let newBestRun = currentStats.bestRun;
    if (!currentStats.bestRun || 
        correctAnswers > currentStats.bestRun.score || 
        (correctAnswers === currentStats.bestRun.score && currentTime < currentStats.bestRun.time)) {
      newBestRun = {
        userName,
        time: currentTime,
        score: correctAnswers,
        accuracy
      };
    }

    const newStats = {
      highScore: Math.max(correctAnswers, currentStats.highScore),
      bestRun: newBestRun,
      highScores: newHighScores
    };

    updateCurrentStats(newStats);
    
    // Update localStorage
    const storagePrefix = quizType === 'navy' ? 'navy' : 
                         quizType === 'army' ? 'army' : 'air';
    
    localStorage.setItem(`${storagePrefix}RanksHighScore`, correctAnswers.toString());
    localStorage.setItem(`${storagePrefix}RanksBestRun`, JSON.stringify(newBestRun));
    localStorage.setItem(`${storagePrefix}RanksHighScores`, JSON.stringify(newHighScores));

    setGameState('finished');
  };

  const handleStartQuiz = (type: QuizType) => {
    setQuizType(type);
    const ranks = type === 'navy' ? navyRanks : type === 'army' ? armyRanks : airForceRanks;
    const shuffled = [...ranks].sort(() => Math.random() - 0.5);
    setShuffledRanks(shuffled);
    setCurrentRankIndex(0);
    setCorrectAnswers(0);
    setTotalAnswers(0);
    setGameState('playing');
    setCurrentTime(0);
    setIsTimerRunning(true);
  };

  const handleRestart = () => {
    setGameState('start');
    setCurrentTime(0);
    setIsTimerRunning(false);
  };

  const getServiceIcon = () => {
    switch (quizType) {
      case 'navy': return <Anchor className="text-blue-600" size={32} />;
      case 'army': return <Sword className="text-green-600" size={32} />;
      case 'air': return <Plane className="text-sky-600" size={32} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 bg-slate-50 p-8">
      <header className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Flag className="text-red-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Canadian Armed Forces Ranks
          </h1>
        </div>
        {gameState !== 'start' && (
          <div className="flex items-center justify-center gap-3 mb-2">
            {getServiceIcon()}
            <h2 className="text-2xl font-bold text-gray-800">
              {quizType === 'navy' ? 'Royal Canadian Navy' : 
               quizType === 'army' ? 'Canadian Army' : 
               'Royal Canadian Air Force'}
            </h2>
          </div>
        )}
        <p className="text-gray-600">Test your knowledge of military ranks</p>
      </header>

      {gameState === 'start' ? (
        <StartScreen 
          onStart={handleStartQuiz} 
          navyStats={navyStats}
          armyStats={armyStats}
          airStats={airStats}
          onResetScores={handleResetScores}
        />
      ) : gameState === 'entering-name' ? (
        <div className="flex flex-col items-center gap-6">
          <ScoreDisplay 
            correct={correctAnswers} 
            total={totalAnswers} 
            highScore={getCurrentStats().highScore}
            onRestart={handleRestart}
            isFinished={true}
            totalQuestions={getCurrentRanks().length}
            currentTime={currentTime}
            bestRun={getCurrentStats().bestRun}
            quizType={quizType}
          />
          <UserNameInput 
            onSubmit={handleUserNameSubmit} 
            currentScore={correctAnswers}
            currentTime={currentTime}
            highScores={getCurrentStats().highScores}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <ScoreDisplay 
            correct={correctAnswers} 
            total={totalAnswers} 
            highScore={getCurrentStats().highScore}
            onRestart={handleRestart}
            isFinished={gameState === 'finished'}
            totalQuestions={getCurrentRanks().length}
            currentTime={currentTime}
            bestRun={getCurrentStats().bestRun}
            quizType={quizType}
          />

          {gameState === 'playing' && shuffledRanks.length > 0 && (
            <FlashCard
              rank={shuffledRanks[currentRankIndex]}
              options={currentOptions}
              onAnswer={handleAnswer}
              onNext={handleNext}
              questionNumber={currentRankIndex + 1}
              totalQuestions={shuffledRanks.length}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
