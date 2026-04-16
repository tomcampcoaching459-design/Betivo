import React from 'react';
import './Header.css';

interface HeaderProps {
  weekNumber: number;
  systemStatus: 'online' | 'offline';
}

const Header: React.FC<HeaderProps> = ({ weekNumber, systemStatus }) => {
  return (
    <header className="betivo-header">
      <div className="header-content">
        <div className="brand-section">
          <h1 className="betivo-title">BETIVO</h1>
          <p className="tagline">Play Smart. Earn More.</p>
        </div>

        <div className="header-indicators">
          <div className="week-indicator">
            <span className="week-label">Week</span>
            <span className="week-number">{weekNumber}</span>
          </div>

          <div className={`system-status ${systemStatus}`}> 
            <span className="status-dot"></span>
            <span className="status-text">
              {systemStatus === 'online' ? '🟢 Live Sync' : '🔴 Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="wave-animation"></div>
    </header>
  );
};

export default Header;