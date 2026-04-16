import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Leaderboard from './components/Leaderboard/Leaderboard';
import AdminPanel from './components/AdminPanel/AdminPanel';
import ActivityLog from './components/ActivityLog/ActivityLog';
import Casino from './components/Casino/Casino';
import './styles/theme.css';
import './styles/responsive.css';

interface Player {
  id: string;
  name: string;
  hours: number;
  coins: number;
  projects: Array<{ name: string; hours: number }>;
  rank: number;
  casino: {
    blackjack: { rank: number; xp: number; maxXp: number };
    poker: { rank: number; xp: number; maxXp: number };
    aviator: { highestMultiplier: number; totalWins: number };
    slots: { spins: number; totalWins: number; jackpots: number };
  };
}

interface Transaction {
  id: string;
  timestamp: string;
  player: string;
  action: string;
  amount: number;
  type: 'hours' | 'coins';
}

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: '1',
      name: 'Alex Champion',
      hours: 145,
      coins: 5420,
      projects: [{ name: 'Web Dev', hours: 60 }, { name: 'Mobile', hours: 85 }],
      rank: 1,
      casino: {
        blackjack: { rank: 5, xp: 850, maxXp: 1000 },
        poker: { rank: 3, xp: 650, maxXp: 1000 },
        aviator: { highestMultiplier: 12.5, totalWins: 28 },
        slots: { spins: 156, totalWins: 42, jackpots: 2 },
      },
    },
    {
      id: '2',
      name: 'Jordan Elite',
      hours: 132,
      coins: 4890,
      projects: [{ name: 'UI Design', hours: 72 }, { name: 'Dev', hours: 60 }],
      rank: 2,
      casino: {
        blackjack: { rank: 4, xp: 720, maxXp: 1000 },
        poker: { rank: 2, xp: 920, maxXp: 1000 },
        aviator: { highestMultiplier: 9.8, totalWins: 21 },
        slots: { spins: 134, totalWins: 38, jackpots: 1 },
      },
    },
    {
      id: '3',
      name: 'Casey Star',
      hours: 118,
      coins: 4320,
      projects: [{ name: 'Analytics', hours: 48 }],
      rank: 3,
      casino: {
        blackjack: { rank: 3, xp: 890, maxXp: 1000 },
        poker: { rank: 4, xp: 540, maxXp: 1000 },
        aviator: { highestMultiplier: 15.2, totalWins: 19 },
        slots: { spins: 102, totalWins: 31, jackpots: 0 },
      },
    },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', timestamp: '2026-04-16T14:30:00Z', player: 'Alex Champion', action: 'Hours Logged', amount: 8, type: 'hours' },
    { id: '2', timestamp: '2026-04-16T13:15:00Z', player: 'Jordan Elite', action: 'Coins Earned', amount: 250, type: 'coins' },
    { id: '3', timestamp: '2026-04-16T12:45:00Z', player: 'Casey Star', action: 'Hours Logged', amount: 5, type: 'hours' },
  ]);

  const [currentWeek, setCurrentWeek] = useState(12);
  const [systemStatus, setSystemStatus] = useState('online');

  const addPlayer = (name: string, hours: number, coins: number) => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name,
      hours,
      coins,
      projects: [],
      rank: players.length + 1,
      casino: {
        blackjack: { rank: 1, xp: 0, maxXp: 1000 },
        poker: { rank: 1, xp: 0, maxXp: 1000 },
        aviator: { highestMultiplier: 0, totalWins: 0 },
        slots: { spins: 0, totalWins: 0, jackpots: 0 },
      },
    };
    setPlayers([...players, newPlayer]);
  };

  const updatePlayerCoins = (playerId: string, amount: number) => {
    setPlayers(
      players.map(p =>
        p.id === playerId ? { ...p, coins: Math.max(0, p.coins + amount) } : p
      )
    );
    const player = players.find(p => p.id === playerId);
    if (player) {
      setTransactions([
        ...transactions,
        {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          player: player.name,
          action: amount > 0 ? 'Coins Added' : 'Coins Removed',
          amount: Math.abs(amount),
          type: 'coins',
        },
      ]);
    }
  };

  const resetPlatform = () => {
    if (window.confirm('⚠️ Are you sure you want to reset the entire platform? This action cannot be undone.')) {
      setPlayers([]);
      setTransactions([]);
      alert('✅ Platform reset successfully');
    }
  };

  return (
    <div className="app">
      <Header weekNumber={currentWeek} systemStatus={systemStatus} />
      
      <div className="main-container">
        <div className="leaderboard-section">
          <Leaderboard players={players} />
        </div>

        <div className="control-section">
          <AdminPanel onAddPlayer={addPlayer} onUpdateCoins={updatePlayerCoins} players={players} />
          <ActivityLog transactions={transactions} />
          <Casino players={players} onUpdateCoins={updatePlayerCoins} />
        </div>
      </div>

      <div className="platform-footer">
        <button className="reset-btn" onClick={resetPlatform}>
          🔄 System Reset
        </button>
      </div>
    </div>
  );
};

export default App;