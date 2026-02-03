import { useDispatch } from "react-redux"
import ActivityNav from "../../components/activity-nav/ActivityNav"
import StatusSelect from "../../components/status-select/StatusSelect"
import "./activitypage.scss"
import { useEffect } from "react"
import { setCurrentPage } from "../../reducers/navbarSlice"

function ActivityPage() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setCurrentPage("activity"))
  },[])

  return (
    <section className="activity-page">
        <div className="activity-page__topbar">
            <ActivityNav/>
            <StatusSelect />
        </div>
    </section>
  )
}

export default ActivityPage