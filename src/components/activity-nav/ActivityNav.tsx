import { useState } from "react";
import "./activitynav.scss";

export type ActivityTab =
  | "my-challenges"
  | "supported-challenges"
  | "video-sales";

const ActivityNav = () => {
  const [activeTab, setActiveTab] = useState<ActivityTab>("my-challenges");

  return (
    <nav className="activity-nav">
      <button
        className={`activity-nav__item ${
          activeTab === "my-challenges" ? "activity-nav__item--active" : ""
        }`}
        onClick={() => setActiveTab("my-challenges")}
      >
        <span className="activity-nav__label">Mis retos</span>
      </button>

      <button
        className={`activity-nav__item ${
          activeTab === "supported-challenges"
            ? "activity-nav__item--active"
            : ""
        }`}
        onClick={() => setActiveTab("supported-challenges")}
      >
        <span className="activity-nav__label">Retos apoyados</span>
      </button>

      <button
        className={`activity-nav__item ${
          activeTab === "video-sales" ? "activity-nav__item--active" : ""
        }`}
        onClick={() => setActiveTab("video-sales")}
      >
        <span className="activity-nav__label">Venta de videos</span>
      </button>
    </nav>
  );
};

export default ActivityNav;
