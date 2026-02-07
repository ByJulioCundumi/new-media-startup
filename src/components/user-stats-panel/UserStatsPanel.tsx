import { MdOutlineSell, MdPendingActions } from "react-icons/md";
import "./userstatspanel.scss";
import { RiVideoUploadLine } from "react-icons/ri";
import { PiFileVideoFill } from "react-icons/pi";
import { GiInjustice } from "react-icons/gi";

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
          <span className="stats-panel__label"><MdPendingActions /> Mis Retos</span>
          <span className="stats-panel__value">{activeChallenges}</span>
        </div>

        <div className="stats-panel__item">
          <span className="stats-panel__label"><PiFileVideoFill /> Por Grabar</span>
          <span className="stats-panel__value">{productionChallenges}</span>
        </div>

        <div className="stats-panel__item">
          <span className="stats-panel__label"><GiInjustice /> Votación</span>
          <span className="stats-panel__value">{votingChallenges}</span>
        </div>

        <div className="stats-panel__item stats-panel__item--highlight">
          <span className="stats-panel__label"><MdOutlineSell /> Por vender</span>
          <span className="stats-panel__value">
            {videosForSale}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default UserStatsPanel;
