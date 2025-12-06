import { Award } from "lucide-react"
import "./affiliates.scss"

function Affiliates() {
  return (
    <div className="affiliates">
            <h2>Afiliados que ya reciben el 70%</h2>
            <p className="aff-sub">
              Estos usuarios ya cuentan con una suscripción activa y disfrutan el máximo porcentaje.
            </p>

            <div className="aff-grid">
              {[ 
                { name: "Camila Torres", sales: 42 },
                { name: "Juan Hernandez", sales: 55 },
                { name: "María Gómez", sales: 33 },
                { name: "Carlos Ruiz", sales: 28 },
              ].map((a, index) => (
                <div className="aff-card" key={index}>
                  <Award className="aff-icon" />
                  <h3>{a.name}</h3>
                  <p>{a.sales} ventas generadas</p>
                  <span className="aff-badge">70% activo</span>
                </div>
              ))}
            </div>
          </div>
  )
}

export default Affiliates