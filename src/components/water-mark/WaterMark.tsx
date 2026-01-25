import { useSelector } from "react-redux"
import "./watermark.scss"
import type { IState } from "../../interfaces/IState"

function WaterMark() {
  const {sidebarOption} = useSelector((state:IState)=>state.sidebar)

  return (
    <div className={`${sidebarOption === "templates" ? "water-mark-fine" : "water-mark"}`}>
        <p>CREADO CON CVREMOTO.COM</p>
    </div>
  )
}

export default WaterMark