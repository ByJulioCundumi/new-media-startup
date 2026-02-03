import "./activitynav.scss";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";
import { setActivityNav } from "../../reducers/navbarSlice";

export type ActivityTab =
  | "challenges"
  | "supported"
  | "selling";

const ActivityNav = () => {
  const dispatch = useDispatch()
  const {activityNav} = useSelector((state:IState)=>state.navbar)

  return (
    <nav className="activity-nav">
      <button
        className={`activity-nav__item ${
          activityNav === "challenges" ? "activity-nav__item--active" : ""
        }`}
        onClick={() => dispatch(setActivityNav("challenges"))}
      >
        Mis retos
      </button>

      <button
        className={`activity-nav__item ${
          activityNav === "supported"
            ? "activity-nav__item--active"
            : ""
        }`}
        onClick={() => dispatch(setActivityNav("supported"))}
      >
        Retos apoyados
      </button>

      <button
        className={`activity-nav__item ${
          activityNav === "selling" ? "activity-nav__item--active" : ""
        }`}
        onClick={() => dispatch(setActivityNav("selling"))}
      >
        Venta de videos
      </button>
    </nav>
  );
};

export default ActivityNav;
