import { Link } from "react-router-dom"
import "./navbar.scss"
import { useDispatch } from "react-redux"
import { setSidebar } from "../../reducers/sidebarSlice"
import { PiReadCvLogo } from "react-icons/pi"
import SwitchNavbar from "../switch-navbar/SwitchNavbar"
import SearchBar from "../search-bar/SearchBar"
import { useState } from "react"
import NotificationBell from "../notification-bell/NotificationBell"
import ProfileAvatar from "../profile-avatar/ProfileAvatar"

function Navbar() {
    const dispatch = useDispatch()
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchBar, setSearchBar] = useState<string>("");
    const [status, setStatus] = useState("all");

  return (
    <div className="navbar">

        {/* LOGO */}
        <Link
          to="/"
          className="navbar__logo"
          onClick={() => dispatch(setSidebar("challenges"))}
        >
          <PiReadCvLogo className="navbar__logo-icon"/>
          <span className="navbar__logo-text">Rettomus</span>
        </Link>
        
        <SwitchNavbar/>
        
        <SearchBar
          textHolder="Buscar"
          onChange={setSearchBar}
        />

        <div className="navbar__end">
          <NotificationBell/>
          <ProfileAvatar/>
        </div>
      </div>
  )
}

export default Navbar