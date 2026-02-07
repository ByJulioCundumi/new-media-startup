import "./switchnavbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { IState } from "../../interfaces/IState";
import { useEffect, useRef } from "react";
import { MdPendingActions } from "react-icons/md";
import { PiFilmSlateLight, PiPathDuotone } from "react-icons/pi";
import { setHomePageNav } from "../../reducers/navbarSlice";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { CgYoutube } from "react-icons/cg";

function SwitchNavbar() {
  const dispatch = useDispatch()
    const { homePageNav } = useSelector((state: IState) => state.navbar)
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
    }, [homePageNav])

  return (
    <div className="switch-navbar">
          <div className="switch-navbar__track">
            <div
              className="switch-navbar__indicator"
              ref={indicatorRef}
            />
    
            <Link
              onClick={() => dispatch(setHomePageNav("challenges"))}
              to="/"
              className={`switch-navbar__option ${
                homePageNav === "challenges" ? "active" : ""
              }`}
            >
              <MdPendingActions />
              <span>Retos <span className="switch-navbar__num">(5)</span> </span>
            </Link>
    
            <Link
              onClick={() => dispatch(setHomePageNav("winners"))}
              to="/winners"
              className={`switch-navbar__option ${
                homePageNav === "winners" ? "active" : ""
              }`}
            >
              <CgYoutube size={20}/>
              <span>Ganadores </span>
            </Link>
    
            <Link
              onClick={() => dispatch(setHomePageNav("activity"))}
              to="/activity"
              className={`switch-navbar__option ${
                homePageNav === "activity" ? "active" : ""
              }`}
            >
              <RiAccountPinCircleLine />
              <span>Mi Cuenta</span>
            </Link>

            <Link
              onClick={() => dispatch(setHomePageNav("activity"))}
              to="/subscriptions"
              className={`switch-navbar__option ${
                homePageNav === "subscriptions" ? "active" : ""
              }`}
            >
              <HiOutlineShoppingCart />
              <span></span>
            </Link>
    
          </div>
        </div>
  );
}

export default SwitchNavbar;
