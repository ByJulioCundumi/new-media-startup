import { useDispatch, useSelector } from "react-redux"
import ActivityNav from "../../components/activity-nav/ActivityNav"
import StatusSelect from "../../components/status-select/StatusSelect"
import "./activitypage.scss"
import { useEffect } from "react"
import { setCurrentPage } from "../../reducers/navbarSlice"
import type { IState } from "../../interfaces/IState"
import MyChallenges from "../my-challenges/MyChallenges"
import SupportedChallenges from "../supported-challenges/SupportedChallenges"
import SellingPage from "../selling-page/SellingPage"

function ActivityPage() {
  const dispatch = useDispatch()
  const {activityNav} = useSelector((state:IState)=>state.navbar)

  useEffect(()=>{
    dispatch(setCurrentPage("activity"))
  },[])

  return (
    <section className="activity-page">
        <div className="activity-page__topbar">
            <ActivityNav/>
            <StatusSelect />
        </div>

        <div className="activity-page__content">
          {activityNav === "challenges" && <MyChallenges/>}
          {activityNav === "supported" && <SupportedChallenges/>}
          {activityNav === "selling" && <SellingPage/>}
        </div>
    </section>
  )
}

export default ActivityPage