import React, { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "./explorenavbar.scss"
import { useDispatch, useSelector } from "react-redux"
import type { IState } from "../../interfaces/IState"
import { BsPatchCheck } from "react-icons/bs"
import { TiLightbulb } from "react-icons/ti"
import { setExplreNavbar } from "../../reducers/navbarSlice"
import { MdPendingActions, MdSlowMotionVideo } from "react-icons/md"
import { AiOutlineYoutube } from "react-icons/ai"
import { PiFilmSlateLight, PiPathDuotone, PiYoutubeLogoLight } from "react-icons/pi"
import { FaMoneyBillTrendUp } from "react-icons/fa6"
import { GiFilmProjector, GiPathDistance } from "react-icons/gi"

const ExploreNavbar: React.FC = () => {
  const dispatch = useDispatch()
  const { exploreNavbar } = useSelector((state: IState) => state.navbar)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const activeEl = document.querySelector(
      ".explore-navbar__option.active"
    ) as HTMLElement

    const indicator = indicatorRef.current

    if (activeEl && indicator) {
      indicator.style.width = `${activeEl.offsetWidth}px`
      indicator.style.left = `${activeEl.offsetLeft}px`
    }
  }, [exploreNavbar])

  return (
    <div className="explore-navbar">
      <div className="explore-navbar__track">
        <div
          className="explore-navbar__indicator"
          ref={indicatorRef}
        />

        <Link
          onClick={() => dispatch(setExplreNavbar("requests"))}
          to="/explore/requests"
          className={`explore-navbar__option ${
            exploreNavbar === "requests" ? "active" : ""
          }`}
        >
          <MdPendingActions />
          <span>Retos <span className="explore-navbar__num">(5)</span> </span>
        </Link>

        <Link
          onClick={() => dispatch(setExplreNavbar("videos"))}
          to="/explore/videos"
          className={`explore-navbar__option ${
            exploreNavbar === "videos" ? "active" : ""
          }`}
        >
          <PiFilmSlateLight />
          <span>Ganadores </span>
        </Link>

        <Link
          onClick={() => dispatch(setExplreNavbar("productions"))}
          to="/explore"
          className={`explore-navbar__option ${
            exploreNavbar === "productions" ? "active" : ""
          }`}
        >
          <PiPathDuotone />
          <span>Mi Actividad</span>
        </Link>

      </div>
    </div>
  )
}

export default ExploreNavbar
