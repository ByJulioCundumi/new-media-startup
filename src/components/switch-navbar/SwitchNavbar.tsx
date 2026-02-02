import "./switchnavbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { IState } from "../../interfaces/IState";
import { useEffect, useRef } from "react";
import { setExplreNavbar } from "../../reducers/navbarSlice";
import { MdPendingActions } from "react-icons/md";
import { PiFilmSlateLight, PiPathDuotone } from "react-icons/pi";

function SwitchNavbar() {
  const dispatch = useDispatch()
    const { exploreNavbar } = useSelector((state: IState) => state.navbar)
    const indicatorRef = useRef<HTMLDivElement>(null)
  
    useEffect(() => {
      const activeEl = document.querySelector(
        ".switch-navbar__option.active"
      ) as HTMLElement
  
      const indicator = indicatorRef.current
  
      if (activeEl && indicator) {
        indicator.style.width = `${activeEl.offsetWidth}px`
        indicator.style.left = `${activeEl.offsetLeft}px`
      }
    }, [exploreNavbar])

  return (
    <div className="switch-navbar">
          <div className="switch-navbar__track">
            <div
              className="switch-navbar__indicator"
              ref={indicatorRef}
            />
    
            <Link
              onClick={() => dispatch(setExplreNavbar("challenges"))}
              to="/"
              className={`switch-navbar__option ${
                exploreNavbar === "challenges" ? "active" : ""
              }`}
            >
              <MdPendingActions />
              <span>Retos <span className="switch-navbar__num">(5)</span> </span>
            </Link>
    
            <Link
              onClick={() => dispatch(setExplreNavbar("winners"))}
              to="/winners"
              className={`switch-navbar__option ${
                exploreNavbar === "winners" ? "active" : ""
              }`}
            >
              <PiFilmSlateLight />
              <span>Ganadores </span>
            </Link>
    
            <Link
              onClick={() => dispatch(setExplreNavbar("activity"))}
              to="/my-activity"
              className={`switch-navbar__option ${
                exploreNavbar === "activity" ? "active" : ""
              }`}
            >
              <PiPathDuotone />
              <span>Mi Actividad</span>
            </Link>
    
          </div>
        </div>
  );
}

export default SwitchNavbar;
