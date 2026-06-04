import React from "react";

function BadgeDisplay({ validator, contributors, currentContributor }) {
  const badgeBase = validator?.badge_assets?.base_path || "/public/badge-assets/";
  const badgeFiles = validator?.badge_assets?.files || {};

  const renderBadge = (role) => {
    const file = badgeFiles[role.toLowerCase()];
    if (!file) return null;

    return (
      <div className="badge-item" key={role}>
        <img
          src={`${badgeBase}${file}`}
          alt={`${role} badge`}
          className="badge-icon"
        />
        <span className="badge-label">{role}</span>
      </div>
    );
  };

  return (
    <div className="badge-display">
      {/* If no contributor is matched */}
      {!currentContributor && (
        <div className="no-contributor">
          <p>No contributor detected.</p>
          <p>Connect a wallet to view your badges.</p>
        </div>
      )}

      {/* If contributor is matched */}
      {currentContributor && (
        <div className="contributor-section">
          <h3>{currentContributor.name}</h3>
          <p className="contributor-id">ID: {currentContributor.id}</p>

          <div className="badge-grid">
            {currentContributor.roles.map((role) => renderBadge(role))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BadgeDisplay;
