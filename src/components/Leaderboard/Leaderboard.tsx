import React, { useState } from 'react';
import './Leaderboard.css';

interface Player {
  id: string;
  name: string;
  hours: number;
  coins: number;
  projects: Array<{ name: string; hours: number }>;
  rank: number;
}

interface LeaderboardProps {
  players: Player[];
}

const getRankBadge = (rank: number): string => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
};

const Leaderboard: React.FC<LeaderboardProps> = ({ players }) => {
  const [hoveredPlayerId, setHoveredPlayerId] = useState<string | null>(null);

  const sortedPlayers = [...players].sort((a, b) => a.rank - b.rank);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>🏆 Leaderboard</h2>
        <p className="leaderboard-subtitle">Top Performers This Week</p>
      </div>

      <div className="leaderboard-cards">
        {sortedPlayers.length === 0 ? (
          <div className="empty-state">
            <p>No players yet. Add your first player to get started!</p>
          </div>
        ) : (
          sortedPlayers.map((player, index) => (
            <div
              key={player.id}
              className={`player-card rank-${player.rank}`}
              onMouseEnter={() => setHoveredPlayerId(player.id)}
              onMouseLeave={() => setHoveredPlayerId(null)}
            >
              <div className="card-header">
                <div className="rank-badge">{getRankBadge(player.rank)}</div>
                <div className="player-info">
                  <h3 className="player-name">{player.name}</h3>
                  {hoveredPlayerId === player.id && (
                    <div className="tooltip">
                      Performance: {Math.round((player.hours / 10) * 10)}% | Engagement: Active
                    </div>
                  )}
                </div>
              </div>

              <div className="metrics-row">
                <div className="metric hours">
                  <span className="metric-label">Hours</span>
                  <span className="metric-value">{player.hours}h</span>
                </div>
                <div className="metric coins">
                  <span className="metric-label">Coins</span>
                  <span className="metric-value">💰 {player.coins.toLocaleString()}</span>
                </div>
              </div>

              <div className="projects-section">
                <div className="projects-label">Projects</div>
                <div className="project-pills">
                  {player.projects.map((project, idx) => (
                    <div key={idx} className="project-pill">
                      <span className="project-name">{project.name}</span>
                      <span className="project-hours">{project.hours}h</span>
                    </div>
                  ))}
                  {player.projects.length === 0 && (
                    <span className="no-projects">No projects yet</span>
                  )}
                </div>
              </div>

              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${Math.min((player.hours / 200) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="progress-label">{Math.min(Math.round((player.hours / 200) * 100), 100)}%</span>
              </div>

              <button className="log-activity-btn">📝 Log Activity</button>
            </div>
          ))
        )}
      </div>

      {/* Top Winners Sidebar */}
      <div className="top-winners-sidebar">
        <h3 className="winners-title">🎯 Top Winners</h3>
        <div className="winners-list">
          {sortedPlayers.slice(0, 5).map((player, idx) => (
            <div key={player.id} className="winner-item">
              <div className="winner-rank">{idx + 1}</div>
              <div className="winner-info">
                <p className="winner-name">{player.name}</p>
                <p className="winner-coins">💎 {player.coins}</p>
              </div>
              <div className="shimmer-badge"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;