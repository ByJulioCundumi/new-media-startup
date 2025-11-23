import "./cvriolanguagesection.scss"

function CvRioLanguageSection() {
  return (
    <div key="languages" className="cv-rio__languajeSection">
            <h2 className="cv-rio__languajeSection--title">Idiomas</h2>

            <div className="cv-rio__languajeSection--item">
              <div className="cv-rio__languajeSection--header">
                <h3 className="cv-rio__languajeSection--item-name">Español</h3>
                <p className="cv-rio__languajeSection--item-level">C2</p>
              </div>

              {/* Barra de progreso */}
              <div className="cv-rio__languajeSection--progress">
                <div
                  className="cv-rio__languajeSection--progress-bar"
                  style={{ width: `${90}%` }}
                ></div>
              </div>
            </div>
          </div>
  )
}

export default CvRioLanguageSection