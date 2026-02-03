import { useState } from "react";
import "./activityNav.scss";

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
        Mis retos
      </button>

      <button
        className={`activity-nav__item ${
          activeTab === "supported-challenges"
            ? "activity-nav__item--active"
            : ""
        }`}
        onClick={() => setActiveTab("supported-challenges")}
      >
        Retos apoyados
      </button>

      <button
        className={`activity-nav__item ${
          activeTab === "video-sales" ? "activity-nav__item--active" : ""
        }`}
        onClick={() => setActiveTab("video-sales")}
      >
        Venta de videos
      </button>
    </nav>
  );
};

export default ActivityNav;
