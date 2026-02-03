import { Outlet } from "react-router-dom"
import ConnectionsPanel from "../../components/connections-panel/ConnectionsPanel"
import Hero from "../../components/hero/Hero"
import "./homepage.scss"
import AvailableChallenges from "../../components/available-challenges/AvailableChallenges"
import Navbar from "../../components/navbar/Navbar"
import UserStatsPanel from "../../components/user-stats-panel/UserStatsPanel"
import { useSelector } from "react-redux"
import type { IState } from "../../interfaces/IState"

function HomePage() {
    const {currentPage} = useSelector((state:IState)=>state.navbar)

  return (
    <section className="home-page">
        <Navbar/>

        <div className="home-page__content">
            <div className="home-page__left">
                <UserStatsPanel
                activeChallenges={353}
                productionChallenges={101}
                votingChallenges={142}
                videosForSale={214}
                />

                <ConnectionsPanel/>
            </div>

            <div className="home-page__right">
                {currentPage !== "activity" && <Hero/>}
                <Outlet/>
            </div>
        </div>

        <AvailableChallenges/>
    </section>
  )
}

export default HomePage