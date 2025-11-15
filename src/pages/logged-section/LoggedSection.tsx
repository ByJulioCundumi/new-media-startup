import { Outlet } from "react-router-dom"
import "./loggedsection.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

function LoggedSection() {
  return (
    <section className="loggedSection">
        <Navbar/>
        <Sidebar/>
        <Outlet/>
    </section>
  )
}

export default LoggedSection