import "./userstatspanel.scss";

interface UserStatsPanelProps {
  activeChallenges: number;
  productionChallenges: number;
  votingChallenges: number;
  videosForSale: number;
}

const UserStatsPanel: React.FC<UserStatsPanelProps> = ({
  activeChallenges,
  productionChallenges,
  votingChallenges,
  videosForSale,
}) => {
  return (
    <aside className="stats-panel">

      <div className="stats-panel__list">
        <div className="stats-panel__item">
          <span className="stats-panel__label">Publicados</span>
          <span className="stats-panel__value">{activeChallenges}</span>
        </div>

        <div className="stats-panel__item">
          <span className="stats-panel__label">Pendientes</span>
          <span className="stats-panel__value">{productionChallenges}</span>
        </div>

        <div className="stats-panel__item">
          <span className="stats-panel__label">En votación</span>
          <span className="stats-panel__value">{votingChallenges}</span>
        </div>

        <div className="stats-panel__item stats-panel__item--highlight">
          <span className="stats-panel__label">Por vender</span>
          <span className="stats-panel__value">
            {videosForSale}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default UserStatsPanel;
