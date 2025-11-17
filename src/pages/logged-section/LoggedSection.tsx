import { Outlet } from "react-router-dom"
import "./loggedsection.scss"
import Sidebar from "../../components/sidebar/Sidebar"

function LoggedSection() {
  return (
    <section className="logged-section">
        <Sidebar/>
        <Outlet/>
    </section>
  )
}

export default LoggedSection