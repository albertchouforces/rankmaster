# Canadian Armed Forces Rank Master

A comprehensive quiz application to test your knowledge of Canadian Armed Forces ranks across all three services: Royal Canadian Navy, Canadian Army, and Royal Canadian Air Force.

## Features

### Multiple Service Branches
- Royal Canadian Navy
- Canadian Army
- Royal Canadian Air Force
- Combined Forces Challenge (all services)

### Quiz Features
- Interactive quiz with visual rank insignias
- Multiple choice questions with 4 options
- Immediate feedback with interesting historical facts
- Real-time timer with pause functionality
- Progress tracking (current question/total)
- Comprehensive scoring system

### Scoring System
- Local high scores tracking (top 5)
- Best run tracking (score + time)
- Global leaderboard integration
- Accuracy percentage calculation
- Achievement recognition for top scores

### User Interface
- Modern, responsive design
- Service-specific color schemes
- Visual rank insignia display
- Loading states and placeholders
- Error handling and feedback
- Medal system for rankings

### Components
- FlashCard: Main quiz interface showing rank images and options
- ScoreDisplay: Real-time score and statistics tracking
- Timer: Precision timer with pause functionality
- HighScoresList: Local high scores display
- GlobalLeaderboard: Worldwide rankings
- StartScreen: Service selection and statistics
- UserNameInput: Score submission interface
- Medal: Visual rank achievement display

## Technical Stack

### Core Technologies
- React 18
- TypeScript
- Vite
- Tailwind CSS

### Dependencies
- lucide-react: Modern icon system
- @supabase/supabase-js: Backend integration for global leaderboard

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Navigate to the project directory:
```bash
cd caf-rank-master
```

3. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at:
```
http://localhost:5173
```

## Building for Production

Create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/         # React components
│   ├── FlashCard.tsx
│   ├── ScoreDisplay.tsx
│   ├── Timer.tsx
│   ├── HighScoresList.tsx
│   ├── GlobalLeaderboard.tsx
│   └── ...
├── data/              # Rank data and descriptions
│   ├── navyRanks.ts
│   ├── armyRanks.ts
│   ├── airForceRanks.ts
│   └── combinedRanks.ts
├── lib/               # Utility functions and services
│   └── supabase.ts
├── types/             # TypeScript type definitions
└── App.tsx            # Main application component
```

## Data Storage

- Local Storage: Persists high scores and user preferences locally
- Supabase: Manages global leaderboard data

## Contributing

This is a professional development learning project. For more information or to contribute, please contact the Learning Support Centre Product Development Lead (Pacific) at joshua.hawthorne@ecn.forces.gc.ca.

## Version History

- v2.2: Latest version with global leaderboard integration
- v2.0: Major update with multi-service support
- v1.0: Initial release with Navy ranks only

## License

This project is intended for educational purposes within the Canadian Armed Forces.

## Acknowledgments

Special thanks to the Canadian Armed Forces Learning Support Centres for supporting this educational initiative.
