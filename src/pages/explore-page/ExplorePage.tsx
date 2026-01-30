import { useDispatch } from "react-redux"
import "./explorepage.scss"
import { useEffect, useState } from "react"
import { setSidebar } from "../../reducers/sidebarSlice"
import { CategorySelector } from "../../components/category-selector/CategorySelector"
import StatusSelect from "../../components/status-select/StatusSelect"
import ExploreNavbar from "../../components/explore-navbar/ExploreNavbar"
import { Outlet } from "react-router-dom"
import GenderFilter from "../../components/gender-filter/GenderFilter"
import { FaSave } from "react-icons/fa"
import { IoBookmarkOutline } from "react-icons/io5"
import { TbBookmark } from "react-icons/tb"
import NotificationBell from "../../components/notification-bell/NotificationBell"
import SearchBar from "../../components/search-bar/SearchBar"

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
        <ExploreNavbar/>
        
        <SearchBar
        
        />

        <div className="explore__end">
          <NotificationBell/>

        <StatusSelect
          value={status}
          onChange={setStatus}
        />

        <button className="explore__saved"><TbBookmark/></button>

        <GenderFilter/>
        </div>
      </div>

      <Outlet/>
    </div>
  )
}

export default ExplorePage