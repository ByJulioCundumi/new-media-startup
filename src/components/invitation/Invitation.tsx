import "./invitation.scss"
import { Link } from 'react-router-dom'

function Invitation() {
  return (
    <div className="job-post">
        <div className="affiliate-invitation">
          <h2>
            ¿Buscas Trabajo Remoto, <br /> <span>Sin Experiencia?</span>
          </h2>

          <p className="affiliate-subtitle">
            Envianos Tu CV.{" "}
            <Link to={"/affiliate"}>
              <strong className="affiliate-link">
                 Únete A Nosotros
              </strong> 
            </Link>{" "}
            y gana comisiones recurrentes de hasta el <strong>70%</strong> por cada venta realizada.
          </p>
        </div>
    </div>
  )
}

export default Invitation