import { useDispatch } from "react-redux"
import "./explorepage.scss"
import { useEffect, useState } from "react"
import { setSidebar } from "../../reducers/sidebarSlice"
import { CategorySelector } from "../../components/category-selector/CategorySelector"
import StatusSelect from "../../components/status-select/StatusSelect"
import ExploreNavbar from "../../components/explore-navbar/ExploreNavbar"
import { Link, Outlet } from "react-router-dom"
import GenderFilter from "../../components/gender-filter/GenderFilter"
import { FaSave } from "react-icons/fa"
import { IoBookmarkOutline } from "react-icons/io5"
import { TbBookmark } from "react-icons/tb"
import NotificationBell from "../../components/notification-bell/NotificationBell"
import SearchBar from "../../components/search-bar/SearchBar"
import ConnectionsPanel from "../../components/connections-panel/ConnectionsPanel"
import AvailableChallenges from "../../components/available-challenges/AvailableChallenges"
import Cta from "../../components/cta/Cta"
import Hero from "../home-page/hero/Hero"
import ProfileAvatar from "../../components/profile-avatar/ProfileAvatar"
import { PiReadCvLogo } from "react-icons/pi"

function ExplorePage() {
    const dispatch = useDispatch()
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [status, setStatus] = useState("all");

    useEffect(()=>{
        dispatch(setSidebar("explore"))
    },[])
    
  return (
    <div className="explore">
        {/* TOP BAR */}
      <div className="explore__topbar">

        {/* LOGO */}
        <Link
          to="/"
          className="navbar__logo"
          onClick={() => dispatch(setSidebar("templates"))}
        >
          <div className="logo-icon">
            <PiReadCvLogo />
          </div>
          <span className="logo-text">CvRemoto</span>
        </Link>
        
        <ExploreNavbar/>
        
        <SearchBar
          textHolder="Buscar"
        />

        <div className="explore__end">
          <NotificationBell/>

          
        <ProfileAvatar/>
        </div>
      </div>

        
      <div className="explore__content">
        <div className="explore__content--left">
          <ConnectionsPanel/>
        </div>
        <div className="explore__content--right">
          <Hero/>
          <Outlet/>
          <AvailableChallenges/>
        </div>
      </div>
    </div>
  )
}

export default ExplorePage