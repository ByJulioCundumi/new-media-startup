import { ArrowRight } from "lucide-react"
import "./commissionrequest.scss"

function CommissionRequest() {
  return (
    <div className="final-cta">
            <h2>Solicita tu aumento al 70%</h2>
            <p>
              Si ya tienes una suscripción activa, puedes solicitar tu comisión máxima ahora mismo.
            </p>

            <button className="cta-button">
              Solicitar aumento <ArrowRight size={18} />
            </button>
          </div>
  )
}

export default CommissionRequest