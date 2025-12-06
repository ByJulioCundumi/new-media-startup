import { Outlet } from "react-router-dom"
import "./loggedsection.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import { useSelector } from "react-redux"
import type { IState } from "../../interfaces/IState"
import Navbar from "../../components/navbar/Navbar"

function LoggedSection() {
  const {sidebarOption} = useSelector((state:IState)=>state.sidebar)

  return (
    <section className="logged-section">
      {sidebarOption !== "create" && <Sidebar/>}
      {sidebarOption !== "create" && sidebarOption !== "job" && <Navbar/>}
        <Outlet/>
    </section>
  )
}

export default LoggedSection