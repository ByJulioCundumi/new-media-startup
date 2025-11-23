import { Outlet } from "react-router-dom"
import "./loggedsection.scss"
import Sidebar from "../../components/sidebar/Sidebar"

function LoggedSection() {
  return (
    <section className="logged-section">
        <Outlet/>
    </section>
  )
}

export default LoggedSection