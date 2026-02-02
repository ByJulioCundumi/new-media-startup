import ActivityNav from "../../components/activity-nav/ActivityNav"
import "./activitypage.scss"

function ActivityPage() {
  return (
    <section className="activity-page">
        <div className="activity-page__topbar">
            <ActivityNav/>
        </div>
    </section>
  )
}

export default ActivityPage