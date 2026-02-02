import { Outlet } from "react-router-dom"
import ConnectionsPanel from "../../components/connections-panel/ConnectionsPanel"
import Hero from "../../components/hero/Hero"
import "./homepage.scss"
import AvailableChallenges from "../../components/available-challenges/AvailableChallenges"
import Navbar from "../../components/navbar/Navbar"
import UserStatsPanel from "../../components/user-stats-panel/UserStatsPanel"

function HomePage() {
  return (
    <section className="home-page">
        <Navbar/>

        <div className="home-page__content">
            <div className="home-page__left">
                <UserStatsPanel
                activeChallenges={3}
                productionChallenges={1}
                votingChallenges={2}
                videosForSale={4}
                />

                <ConnectionsPanel/>
            </div>

            <div className="home-page__right">
                <Hero/>
                <Outlet/>
            </div>
        </div>

        <AvailableChallenges/>
    </section>
  )
}

export default HomePage